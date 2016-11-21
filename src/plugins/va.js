/*
* 	流程： 绑定指令-> 设置配置(vaConfig) -> 校验(check) -> 报错(showErr) 或 自定义报错
 */


var va = {};
function check(v, conditions){
	var res = 0;										//0代表OK, 若为数组代表是某个字段的错误
	//验证函数
	var cfg = {
		//非空
		nonvoid: (v, bool)=>{
			if(bool){
				return v ? 0 : ['nonvoid'];
			}else{
				return 0;
			}
		},
		reg:(v, reg)=> reg.test(v) ? 0 : ['reg'],				//正则
		limit:(v, interval)=> (v >= interval[0] && v <= interval[1]) ? 0 : ['limit', interval],
		equal: (v, target)=>{														//和什么相等
			var _list = document.getElementsByName(target), _target
			for(var i = 0;i < _list.length;i++){
				if(_list[i].className.indexOf('va') > -1){
					_target = _list[i];
				}
			}
			return (_target.value === v) ? 0 : ['equal', _target.getAttribute('va-tag')]
		}

	}

	for(var i = 0;i < conditions.length;i++){
		var condi = conditions[i], 
				type = condi.type, 
				typeVal = condi.typeVal

		console.log(condi)
		res = cfg[type](v, typeVal)
		// console.log(v,res) 
		
		//如果有自定义报错信息， 返回自定义的报错信息
		if(res){
			res = condi.errMsg || res
			break
		}		
	}

	return res;
}

function showErr(name, checkResult){
	var type = checkResult[0],
			ext = checkResult[1] || []

	var ERR_MSG = {
		nonvoid: `${name}不能为空`,
		reg: `${name}格式错误`,
		limit: `${name}必须在${ext[0]}与${ext[1]}之间`,
		equal: `两次${ext}不相同`
	}

	layer.msgWarn(ERR_MSG[type])
}

//va配置的构造函数
function VaConfig(type, typeVal, errMsg, name, tag){
	this.type = type, this.typeVal = typeVal, this.errMsg = errMsg, this.name = name, this.tag = tag
}

va.install = function(Vue){

	Vue.directive('va',function(el, binding, vnode){
  	var vm = vnode.context
		   ,name = binding.arg
		   ,tag = el.getAttribute('va-tag')
		   ,baseCfg = []										//默认的校验规则						 --不用写，默认存在的规则（如非空）
		   ,optionalCfg = []								//用户选择的配置成套         --bingding.modifiers
		   ,customCfg = []									//用户自定义的规则（组件中） --bingding.value
		   ,option = binding.modifiers

  	el.className = 'va' + vm._uid 
  	el.name = name
  	vm.vaConfig || (vm.vaConfig = {})

  	var eazyNew = (type, typeVal) =>{return new VaConfig(type, typeVal, '', name, tag)}
  	var NON_VOID = eazyNew('nonvoid', true)
  		 ,cfg_ImgCode = eazyNew('reg', /^[0-9a-zA-Z]{4}$/) 
  	// var NON_VOID = new VaConfig('nonvoid', true, '', name, tag)		//非空
  	if(!option.canNull){
	  	baseCfg.push(NON_VOID)
  	}
  	if(option.ImgCode){
  		optionalCfg.push(cfg_ImgCode)
  	}


  	//用户自定义的规则
  	customCfg = binding.value.map(item=>{
	  	let type = Object.keys(item)[0];
	  	return new VaConfig(type, item[type], '', name, tag)
  	})
  	console.log(baseCfg, optionalCfg, customCfg)
  	
  	//重复的规则要剔除
  	vm.vaConfig[name] = baseCfg.concat(optionalCfg).concat(customCfg)
  	// console.log(binding)


  	//如果需要立即校验的话，在这里处理
  	// el.addEventListener('change', function(){
  	// 	console.log(vm.vaConfig)
  	// })

	  // console.log(binding.value)
	  console.log(vm.vaConfig)
	})

	Vue.directive('va-check',  function(el, binding, vnode){
		var vm = vnode.context;
		el.addEventListener('click', function(){
			var domList = document.getElementsByClassName('va' + vm._uid);

			for(var i = 0;i < domList.length;i++){
				var dom = domList[i],
						name = dom.name,
						value = dom.value,
						conditions = vm.vaConfig[name];
				vm.vaResult || (vm.vaResult = {})
				vm.vaResult[name] = check(value, conditions);
				var _result = vm.vaResult[name]
				if(_result){
					//如果返回的是字符串，则为自定义报错； 如果是数组，则使用showErr 报错
					typeof _result === 'string' ? layer.msgWarn(_result) : showErr(conditions[0].tag, _result)	
					return
				}
			}

			//这里取值
			// layer.msgWarn('全部校验成功')
			console.log(vm.vaResult)
		})

	})

	//自定义设置配置的api
	Vue.prototype.$va = {}
	Vue.prototype.$va_setErrMsg = function(name, type, errMsg){
		for(var i = 0, _conditions = this.vaConfig[name]; i < _conditions.length; i++){
			if(_conditions[i].type === type){
				_conditions[i].errMsg = errMsg
			}
		}
	}


}


module.exports = va