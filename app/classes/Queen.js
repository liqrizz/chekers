import Checker from './Checker';

export default class Queen extends Checker {
    constructor(param) {
        super(param);
    }

    stepCalc() {
        const y = this.position.y;
        const id = parseInt(this.position.index);
        const stepMathValues = {
            true: {
                step: [
                    {target: 3},
                    {target: 4},
                    {target: -5},
                    {target: -4},
                ],
            },
            false: {
                step: [
                    {target: 4},
                    {target: 5},
                    {target: -4},
                    {target: -3},
                ],
            },
            animate: [
                {
                    x: 72,
                    y: 72
                },
                {
                    x: -72,
                    y: 72
                },
                {
                    x: 72,
                    y: -72
                },
                {
                    x: -72,
                    y: -72
                }
            ],
            limiter: [0, 1, 2, 3, 7, 8, 15, 16, 23, 24, 28, 29, 30, 31]
        };

        let diagonal = [];
        const currentMathTree = stepMathValues[(y % 2 === 0).toString()];

        // Подготовка сторон оветвления
        currentMathTree.step.forEach((mathValue, index) => {
            const localTarget = mathValue.target;
            const outCell = id + localTarget;
            const obj = this.getCell(outCell);

            if (obj === undefined || obj.xy.y === y || obj.xy.y === y + 2 || obj.xy.y === y - 2) return;

            const animate = stepMathValues.animate[index];

            diagonal.push({
                cell: outCell,
                id: index,
                find: {flag: false},
                animate
            });
        });

        let search = true;
        let animation_iterator = 1;

        while (search) {
            const iterationData = [];

            diagonal.forEach(elem => {
                if (elem.end) return;

                const cell = elem.cell;
                const find = elem.find.flag ? elem.find : this.targetDetector(cell);
                const target = elem.find.flag ? elem.target : cell;
                const x = elem.animate.x * animation_iterator;
                const y = elem.animate.y * animation_iterator;
                const animateStep = `${x}px, ${y}px`;
                const busy = this.cellTest(cell, false, animateStep);

                if (busy.flag && elem.find.flag) {
                    this._steps.attack.push({
                        step: cell,
                        target,
                        animate: animateStep
                    });
                }

                const id = elem.id;
                const localY = this.getCell(cell).xy.y;
                const localCurrentMathTree = stepMathValues[(localY % 2 === 0).toString()];
                const localTarget = localCurrentMathTree.step[id].target;
                const outCell = cell + localTarget;
                const animate = stepMathValues.animate[id];
                let end = stepMathValues.limiter.includes(cell);
                if (!end && find.flag && !this.cellTest(outCell, true).flag) end = true;

                if (!end && elem.find.flag) {
                    localCurrentMathTree.step.forEach((test, testIndex) => {
                        const test_out_cell = cell + test.target;

                        if (test_out_cell === elem.find.cell || end) return;
                        if (!this.targetDetector(test_out_cell).flag) return;

                        const testY = this.getCell(test_out_cell).xy.y;
                        const testCurrentMathTree = stepMathValues[(testY % 2 === 0).toString()];
                        const testTarget = testCurrentMathTree.step[testIndex].target;
                        const checking_cell = test_out_cell + testTarget;

                        if (checking_cell < 0 || checking_cell > 31) return;
                        if (!this.targetDetector(checking_cell).flag) end = true;
                    });
                }

                if (!end && busy.color === this.color) end = true;

                iterationData.push({
                    cell: outCell, id, end, target, find, animate
                });

            });

            diagonal = [...iterationData];

            if (diagonal.filter(elem => !elem.end).length === 0) {
                search = false;
            }
            animation_iterator++;
        }
    }

    targetDetector(index) {
        const obj = this.getCell(index);
        if (obj.checker_obj === null) return {flag: false, cell: index};
        if (obj.checker_obj.color !== this.color) return {flag: true, cell: index};
        return {flag: false, cell: index};
    }
}