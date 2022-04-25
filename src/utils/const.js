export default {

  install(Vue,options){
    let domainName = '';
    if(window.location.host.includes('susongzhijia')){
      domainName = 'http://yy-web.susongzhijia.com/';
    }else{
      // domainName = window.location.protocol+"//"+window.location.host+"/";
      domainName = 'http://47.98.38.192:9088/';
      // http://47.98.38.192:9088/
    }
    Vue.prototype.global = {
      domainName:domainName
    };
  }

}
