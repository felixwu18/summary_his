/**
 * 标准差 standard deviation
 */
 export default {
              data() {
                  return {
                    multipleSelection: []
                  };
              },
              methods: {
                selectRow(selection, row, key) {
                  row = row[1]
                  const index = this.multipleSelection.findIndex(item => item[key] === row[key])
                  if(index === -1) {
                      this.multipleSelection.push(row)
                  } else {
                      this.multipleSelection.splice(index, 1)
                  }
                },
                handleCheckData(tableData, tableRef, key) {
                            tableData.forEach(item => {
                                this.multipleSelection.forEach(mItem => {        
                                          if(item[key] === mItem[key]) {
                                             this.$next(() => {
                                                 this.toggleRowSelection(item, true)          
                                             })
                                          }
                                })
                            })
                },
                selectAll(selection, tableData, key) {
                   selection = selection[0]
                   if(!selection.length) {
                          tableData.forEach(item => {
                                        const index = this.multipleSelection.findIndex(mItem => mItem[key] === item[key])
                                        if(index !== -1) {
                                          this.multipleSelection.splice(index, 1)
                                        }
                          })
                   } else {
                            selection.forEach(item => {
                                          const index = this.multipleSelection.findIndex(mItem => mItem[key] === item[key])
                                          if (index === -1) {
                                             this.multipleSelection.push(item)
                                          }
                            })
                   }
              }
              },
              components: {},
              created() {
              },
              mounted() { },
              computed: {}
          };
          