import Model from "./modelLib";
const demoModel = new Model({
  prop: {
    type: String,
    property: "prop"
  },
  label: {
    type: String,
    property: "id.label"
    //     property: ["id.label",'id'],
    //     computed(val){
    //       val += '***';
    //       return val
    //     }
  },
  time: {
    type: Date,
    property: "time"
  },
  money: {
    type: Number,
    unit: "B",
    property: "money"
  }
});

export default demoModel;
