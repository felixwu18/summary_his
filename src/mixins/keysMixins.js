/**
 * @Descripttion: 快捷键功能指令
 * eg: 重写handleShortcuts()
 * handleShortcuts() {
      return [
       { key: 'Z', callback: this.goBack, fnKey: 'alt'},            
       { key: 'N', callback: this.handleCreatePlan, fnKey: 'alt'},            
      ]        
   }
 */
 export default {
              data() {
                  return {
                  };
              },
              created() {
                  document.addEventListener('keydown', this.handleAddKeyEvent, true)
              },
              destroyed(){
                  document.removeEventListener('keydown', this.handleAddKeyEvent)            
              },
              methods: {
                 handleShortcuts() {
                    return []        
                 },
                  proxyClick() {
                      const refs = this.$refs[refsName]
                      if(refs && refs.$el) {
                          refs.$el.click()          
                      }      
                  },
                  handleAddKeyEvent(event) {
                      const e = event;
                      const datas = this.handleShortcuts() || []
                      datas.forEach((i) => {
                         if(!this.lisevent.getKeyCode(i.key)) {
                            const allKeys = this.lisevent.getKeyCode()
                            return console.error(`key '${i.key}' not in lisevent. 'keyboardData: [${allKeys}]'`)
                         }
                         if(i.fnKey) {
                            if(e.keyCode === this.lisevent.getKeyCode(i.key) && e[i.fnKey + 'Key']) {
                                  i.callback()
                                  event.preventDefault()
                                  event.returnValue = false
                                  return false
                            }
                         } else {
                            if(e.keyCode === this.lisevent.getKeyCode(i.key)) {
                                  i.callback()
                                  event.preventDefault()
                                  event.returnValue = false
                              return false
                            }          
                         }
                      })
                  }
              },
          };
          