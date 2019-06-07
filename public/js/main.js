var app = new Vue({
  el: "#app",
  data: {
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
    load: ``,
    info: ""
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
      this.load = `<div class="animationScreen">
        <img src="img/bypassing.gif" />
      </div>`;
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
        this.load = ``;
      }, 1500);
    }
  }
});

Vue.config.productionTip = false;
