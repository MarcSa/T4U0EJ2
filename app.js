const { createApp, ref } = Vue;
const figures = [
    {
        name: 'Cuadrado',
        attr: [{ name: 'Lado', tag: 'c', variable: 0 }],
        form: 'Área = c x c =',
        calc: (c) => c * c,
    },
    {
        name: 'Rectángulo',
        attr: [
            { name: 'Base', tag: 'b', variable: 0 },
            { name: 'Altura', tag: 'a', variable: 0 },
        ],
        form: 'Área = b x a =',
        calc: (b, a) => b * a,
    },
    {
        name: 'Círculo',
        attr: [{ name: 'Radio', tag: 'r', variable: 0 }],
        form: 'Área = pi x r x r=',
        calc: (r) => Math.round(Math.PI * 100 * r * r) / 100,
    },
    {
        name: 'Triángulo',
        attr: [
            { name: 'Base', tag: 'b', variable: 0 },
            { name: 'Altura', tag: 'a', variable: 0 },
        ],
        form: 'Área = b x a / 2 =',
        calc: (b, a) => Math.round(b * a * 100) / 200,
    },
];
const app = createApp({
    template: `
                <div class="card">
                    <div class="card-header text-bg-dark text-center">
                        <h1>Calculadora de Áreas</h1>
                        <p class="lead">Calcula áreas de figuras geométricas</p>
                    </div>
                    <div class="card-body">
                        <p><strong>Selecciona una figura:</strong></p>
                        <div id="figures" class="row justify-content-md-center">
                            <div class="figure col-6 mb-4" v-for="figure of figures">
                                <button type="button" class="btn btn-secondary btn-lg w-100" @click="selectFigure(figure)">{{figure.name}}</button>
                            </div>
                        </div>
                    </div>
                    <div class="area-section px-4" v-if="isFigureSelected">
                        <hr>
                        <div class="row">
                            <div v-for="figureAttr of figureAttrs" class="col-6">
                                <p><strong>{{figureAttr.name}}({{figureAttr.tag}}):</strong></p>
                                <div class="mb-4">
                                    <input type="number" min="0" v-model.number="figureAttr.variable">
                                </div>
                            </div>
                        </div>
                        <div class="row p-3">
                            <div class="col-12 text-center rounded-1 bg-body-tertiary p-3">
                                <p class="text-body-tertiary fst-italic">{{figureFormSelected}}</p>
                                <h3>{{figureCalcSelected(...figureAttrs.map(attr => attr.variable))}}</h3>
                                <p class="text-body-tertiary mb-0">unidades cuadradas</p>
                            </div>
                        </div>
                    </div>
                </div>
                `,
    setup() {
        let isFigureSelected = ref(false);
        let figureAttrs = ref([]);
        let figureFormSelected = ref('');
        let figureCalcSelected = ref(0);
        const selectFigure = (figure) => {
            isFigureSelected.value = true;
            figureAttrs.value = figure.attr;
            figureFormSelected.value = figure.form;
            figureCalcSelected.value = figure.calc;
        };
        return {
            isFigureSelected,
            figureAttrs,
            figureFormSelected,
            figureCalcSelected,
            selectFigure,
            figures,
        };
    },
});

app.mount('#vueApp');
