import demoModel from "@/dataModel/model";
const getdemoModel = async function() {
  //   const data = [
  //     { prop: "name", label: "姓名-selcet1" },
  //     { prop: "time", label: "日期-selcet2" },
  //     { prop: "province", label: "省份-selcet6" },
  //     { prop: "city", label: "市区-selcet2" },
  //     { prop: "address", label: "地址-selcet1" },
  //     { prop: "zip", label: "邮编-selcet9" }
  //   ];
  const data = {
    prop: "name",
    id: { label: "姓名-selcet1" },
    time: Date.now(),
    money: 12345
  };
  //   const res = await axios.get("/api/index");
  return demoModel.parse(data);
//   const r = demoModel.parse(data);
//   return demoModel.traverse(r);
};
export default getdemoModel;
