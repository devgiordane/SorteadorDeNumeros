<template>
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <form class="">
            <div class="form-group">
              <label>Valor inicial</label>
              <input
                type="number"
                class="form-control"
                placeholder="ex: 01"
                v-model.number="valorInicial"
              />
              <small v-show="ajudaVi" class="form-text text-muted">
                Este campo não pode ficar em branco.
              </small>
            </div>
          </form>
        </div>
        <div class="col-6">
          <form class="">
            <div class="form-group">
              <label>Valor final</label>
              <input
                type="number"
                class="form-control"
                placeholder="ex: 100"
                v-model.number="valorFinal"
              />
              <small v-show="ajudaVf" class="form-text text-muted">
                Este campo não pode ficar em branco.
              </small>
            </div>
          </form>
        </div>
        <div class="col-6">múltiplos números</div>
        <div class="col-6">repetir números</div>
        <div class="col-6 d-flex justify-content-end align-items-center">
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <input
                  type="checkbox"
                  aria-label="Checkbox for following text input"
                  v-model="multiNumberCheckbox"
                />
              </div>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Text input with checkbox"
              :disabled="multiNumberDisabled"
              v-model="multiNumberValue"
            />
          </div>
        </div>

        <div class="col-6 d-flex justify-content-end align-items-center">
          <div class="btn-group btn-group-toggle  btn-block">
            <!-- data-toggle="buttons" -->
            <label :class="'btn btn-info ' + repeatNumbersYes">
              <input type="radio" value="sim" v-model="repeatNumbers" />
              Sim
            </label>
            <label :class="'btn btn-info ' + repeatNumbersNo">
              <input type="radio" value="nao" v-model="repeatNumbers" />
              Não
            </label>
          </div>
        </div>
        <div class="col-6">
          <small v-show="multiNumberHelp" class="form-text text-muted">
            Este campo não pode ficar em branco.
          </small>
        </div>
        <div class="col-6">
          <small v-show="repeatNumbersHelp" class="form-text text-muted">
            Para que o numeros sorteados não se repitam, é necessário que a
            quantidade de numeros a serem sorteados seja menor o fim do
            intervalo.
          </small>
        </div>
        <div class="col-12 py-3">
          <button
            v-on:click="sortear"
            :disabled="DisableButtonSort"
            class="btn btn-outline-info rounded-pill btn-lg btn-block"
          >
            SORTEAR
          </button>
        </div>
        <div class="col-12 text-black-50">
          <p class="lead text-center">{{ info }}</p>
          <div
            class="d-flex flex-wrap align-items-center justify-content-center"
          >
            <span
              class="badge badge-pill badge-success m-1"
              v-for="number in sortedNumbers"
              :key="number"
            >
              <h1 class="m-0 px-2 h3">{{ number }}</h1>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="load" class="animationScreen">
      <img src="../assets/bypassing.gif" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Sorteador",
  data: function() {
    return {
      valorInicial: 1,
      valorFinal: 100,
      ajudaVi: false,
      ajudaVf: false,
      multiNumberDisabled: true,
      multiNumberCheckbox: false,
      multiNumberValue: 1,
      multiNumberHelp: false,
      repeatNumbers: "sim",
      repeatNumbersYes: "active",
      repeatNumbersNo: "",
      repeatNumbersHelp: false,
      sortedNumbers: [],
      DisableButtonSort: false,
      load: false,
      info: ""
    };
  },
  watch: {
    valorInicial: function() {
      if (this.valorInicial === "") {
        this.ajudaVi = true;
        this.DisableButtonSort = true;
      } else {
        this.ajudaVi = false;
        this.DisableButtonSort = false;
      }

      if (this.valorInicial === this.valorFinal) {
        this.DisableButtonSort = true;
      } else {
        this.DisableButtonSort = false;
      }
    },
    valorFinal: function() {
      if (this.valorFinal === "") {
        this.ajudaVf = true;
        this.DisableButtonSort = true;
      } else {
        this.ajudaVf = false;
      }
      if (this.valorInicial === this.valorFinal) {
        this.DisableButtonSort = true;
      } else {
        this.DisableButtonSort = false;
      }
    },
    multiNumberCheckbox: function() {
      if (this.multiNumberCheckbox) {
        this.multiNumberDisabled = false;
      }
      if (!this.multiNumberCheckbox) {
        this.multiNumberDisabled = true;
        this.multiNumberValue = 1;
      }
    },
    multiNumberValue: function() {
      if (this.multiNumberValue === "") {
        this.multiNumberHelp = true;
      } else {
        this.multiNumberHelp = false;
      }
      if (
        this.multiNumberValue > this.valorFinal - this.valorInicial + 1 &&
        this.repeatNumbers === "nao"
      ) {
        this.repeatNumbersHelp = true;
        this.DisableButtonSort = true;
      } else {
        this.repeatNumbersHelp = false;
        this.DisableButtonSort = false;
      }
    },
    repeatNumbers: function() {
      if (this.repeatNumbers === "sim") {
        this.repeatNumbersYes = "active";
        this.repeatNumbersNo = "";
        this.repeatNumbersHelp = false;
      }
      if (this.repeatNumbers === "nao") {
        this.repeatNumbersYes = "";
        this.repeatNumbersNo = "active";
        if (
          this.multiNumberValue > this.valorFinal - this.valorInicial + 1 &&
          this.repeatNumbers === "nao"
        ) {
          this.repeatNumbersHelp = true;
          this.DisableButtonSort = true;
        } else {
          this.repeatNumbersHelp = false;
          this.DisableButtonSort = false;
        }
      }
    }
  },
  methods: {
    sortear: function() {
      if (this.sortedNumbers.length > 0) {
        this.sortedNumbers = [];
      }
      this.load = true;
      this.info = "Números sorteados:";

      setTimeout(() => {
        for (let index = 0; index < this.multiNumberValue; index++) {
          var random = (
            Math.random() * (+this.valorFinal - +this.valorInicial) +
            +this.valorInicial
          ).toFixed(0);

          if (this.repeatNumbers === "nao") {
            if (
              this.multiNumberValue >
              this.valorFinal - this.valorInicial + 1
            ) {
              this.info =
                "Não é possivel sortear sem repetição quando a quantidade de números é menor que o intervalo escolhido.";
            } else {
              if (!this.sortedNumbers.includes(random)) {
                this.sortedNumbers.push(random);
              } else {
                index--;
              }
            }
          } else {
            this.sortedNumbers.push(random);
          }
        }
        this.load = false;
      }, 2000);
    }
  }
};
</script>
