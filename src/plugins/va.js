/*
* 	流程： 绑定指令-> 设置配置(vaConfig) -> 校验(check) -> 报错(showErr) 或 自定义报错
 */

var va = {};

function unique(arr){
	var hashTable = {}, newArr = [];
	for(var i = 0;i < arr.length;i++){
		if(!hashTable[arr[i]]){
			hashTable[arr[i]] = true;
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

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
			return (_target.value === v) ? 0 : ['equal', _target.getAttribute('tag')]
		},
		unique:(v, name)=>{
			var _list = document.getElementsByName(name),
					valList = [].map.call(_list, item=>item.value)
			return (unique(valList).length === valList.length) ? 0 : ['unique']
		}
	}

	for(var i = 0;i < conditions.length;i++){
		var condi = conditions[i], 
				type = condi.type, 
				typeVal = condi.typeVal
		// console.log(type,v, typeVal)
		res = cfg[type](v, typeVal)
		
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
		equal: `两次${ext}不相同`,
		unique: `${name}重复`
	}

	layer.msgWarn(ERR_MSG[type])
}

//va配置的构造函数
function VaConfig(type, typeVal, errMsg, name, tag){
	this.type = type, this.typeVal = typeVal, this.errMsg = errMsg, this.name = name, this.tag = tag
}
//用来剔除重复的规则，以及规则的覆盖。默认后面的取代前面
Array.prototype.uConcat = function(arr){
	var comb = this.concat(arr)
			,unique = {}
			,result = []

	for(var i = 0;i < comb.length;i++){
		// console.log(i, comb[i])
		var type = comb[i].type
		if(unique[type]){
			var index = unique[type].index 
			unique[type] = comb[i]
			unique[type].index = index;
		}else{
			unique[type] = comb[i]
			unique[type].index = i;
		}
	}

	for(var i= 0;i < 100;i++){
		for(var item in unique){
			if(unique[item].index === i){
				delete unique[item].index
				result.push(unique[item])
			}
		}
	}
	return result
}

//正则表
var regList = {
	ImgCode: /^[0-9a-zA-Z]{4}$/,
	SmsCode: /^\d{4}$/,
	MailCode: /^\d{4}$/,
	UserName: /^[\w|\d]{4,16}$/,
	Password: /^[\w!@#$%^&*.]{6,16}$/,
	Mobile: /^1[3|5|8]\d{9}$/,
	RealName: /^[\u4e00-\u9fa5 ]{2,10}$/,
	BankNum: /^\d{10,19}$/,
	Money: /^\d{1,}(\.\d{1,2})?$/,
	Answer: /^\S+$/,
	Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

va.install = function(Vue){

	Vue.directive('va',{
		bind:function(el, binding, vnode){
	  	var vm = vnode.context
			   ,name = binding.arg
			   ,tag = el.getAttribute('tag')
			   ,baseCfg = []										//默认的校验规则						 --不用写，默认存在的规则（如非空）
			   ,optionalConfig = []								//用户选择的配置成套         --与name相关			
			   ,customConfig = []									//用户自定义的规则（组件中） --bingding.value
			   ,option = binding.modifiers

	  	el.className = 'va' + vm._uid 
	  	el.name = name
	  	vm.vaConfig || (vm.vaConfig = {})

	  	var eazyNew = (type, typeVal) =>{return new VaConfig(type, typeVal, '', name, tag)}
	  	var NON_VOID = eazyNew('nonvoid', true)

	  	//默认非空,如果加了canNull的修饰符就允许为空
	  	if(!option.canNull){
		  	baseCfg.push(NON_VOID)
	  	}

	  	//不能重复的
	  	if(option.unique){
	  		optionalConfig.push(eazyNew('unique', name))
	  	}

	  	var regOptions = Object.keys(option);
	  	for(var i = 0;i < regOptions.length;i++){
	  		var regOption = regOptions[i]
	  		if(regList[regOptions[i]]){
	  			optionalConfig.push(eazyNew('reg', regList[regOption]))
	  		}
	  	}


	  	//如果regList里有name对应的，直接就加进optionalConfig
	  	if(regList[name]){
	  		optionalConfig.push(eazyNew('reg', regList[name])) 
	  	}

	  	//用户自定义的规则
	  	if(binding.value){
		  	customConfig = binding.value.map(item=>{
			  	let type = Object.keys(item)[0];
			  	return new VaConfig(type, item[type], '', name, tag)
		  	})
	  	}

	  	//规则由 默认规则 + 修饰符规则 + 写在属性的自定义规则 合并（后面的同type规则会覆盖前面的）
	  	vm.vaConfig[name] = baseCfg.uConcat(optionalConfig).uConcat(customConfig)

	  	//如果需要立即校验的话，在这里处理
	  	// el.addEventListener('change', function(){
	  	// 	console.log(vm.vaConfig)
	  	// })

		  console.log(vm.vaConfig)
	  }
	})

	Vue.directive('va-check', { 
		bind:function(el, binding, vnode){
			var vm = vnode.context
			el.addEventListener('click', function(){
				var domList = document.getElementsByClassName('va' + vm._uid);
				vm.vaResult || (vm.vaResult = {})
				vm.vaVal || (vm.vaVal = {})

				for(var i = 0;i < domList.length;i++){
					var dom = domList[i],
							name = dom.name,
							value = dom.value,
							conditions = vm.vaConfig[name];
					
					vm.vaResult[name] = check(value, conditions);
					var _result = vm.vaResult[name]
					//如果返回不为0,则有报错
					if(_result){
						//如果返回的是字符串，则为自定义报错； 如果是数组，则使用showErr 报错
						typeof _result === 'string' ? layer.msgWarn(_result) : showErr(conditions[0].tag, _result)	
						return
					}
					vm.vaVal[name] = value
				}
				
				// layer.msgWarn('全部校验成功')
				console.log(vm.vaVal)
			})
		}
	})

	/**
   **  在实例的monuted周期使用 api设置自定义配置
	 */
	
	//设置自定义报错信息
	Vue.prototype.$va_setErrMsg = function(name, type, errMsg){
		for(var i = 0, _conditions = this.vaConfig[name]; i < _conditions.length; i++){
			if(_conditions[i].type === type){
				_conditions[i].errMsg = errMsg
			}
		}
	}
	//设置区间限制
	Vue.prototype.$va_setLimit = function(name, limit){
		for(var i = 0, _conditions = this.vaConfig[name]; i < _conditions.length;i++){
			if(_conditions[i].type === 'limit'){
				_conditions[i].typeVal = limit;
			}
		}
	}

}

module.exports = va