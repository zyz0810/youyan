export default {

  install(Vue,options){
    let domainName = '';
    if(window.location.host != '47.98.38.192:8088'){
      domainName = 'http://yy.susongzhijia.com/';
    }else{
      // domainName = window.location.protocol+"//"+window.location.host+"/";
      domainName = 'http://47.98.38.192:8088/';
    }
    Vue.prototype.global = {
      domainName:domainName
    };
  }

}
