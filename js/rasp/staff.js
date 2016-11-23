var gManager = null,
	managerUrl = 'https://instasport.co/club/'+clubName+'/api/manager/?format=json';

function staffApp (){
	this.init = function(instructors){
		if(typeof instructors == "object"){
			insertToPage(instructors);
		}
	}

	function insertToPage(obj){
		var instructTplArr = ['<h2 style="font-weight:bold;">Инстрокторы</h2>'],
		managerTplArr = ['<h4 class="cld-manager-title">Менеджеры</h4>'];

		function insertInstructor(instruct){
			var instructTpl = $([
				'<div class="cld-instruct">',
				'<img src="" alt="Инструктор" height="160px" class="cld-instruct-img">',
				'<span class="cld-instruct-name"></span>',
				'</div>'
				].join(''));
			if(instruct.avatar == null){
				instructTpl.find('.cld-instruct-img').prop('src', 'default-image.svg')
				.addClass('cld-instruct-no-img');
			}else{
				instructTpl.find('.cld-instruct-img').prop('src', instruct.avatar);
			}
			instructTpl.find('.cld-instruct-name').text(instruct.name);
			return instructTpl;
		}

		function insertMenegrs(manager){
			var managerTpl = $([
				'<div class="cld-manager">',
				'<img src="" alt="Менеджер" height="160px" class="cld-manager-img">',
				'<span class="cld-manager-name"></span>',
				'</div>'
				].join(''));
			if(manager.avatar == null){
				managerTpl.find('.cld-manager-img').prop('src', 'default-image.svg')
				.addClass('cld-manager-no-img');
			}else{
				managerTpl.find('.cld-manager-img').prop('src', manager.avatar);
			}
			managerTpl.find('.cld-manager-name').text(manager.name+' ('+manager.phone+')');
			return managerTpl;
		}

		$.each(obj, function(index, val){
			instructTplArr.push(insertInstructor(val));
		});

		$('.cld-instruct-wrap').html(instructTplArr);
		$('.cld-instruct-wrap').show();
		if(gManager == null){
			getMenegers('',managerUrl,function(m){
				// if(m != '' || m != '[]'){
				if(m != ''){

					$.each(m, function(index, val){
						managerTplArr.push(insertMenegrs(val));
					});
					$('.cld-manager-wrap').html(managerTplArr);
					$('.cld-manager-wrap').show();
					gManager = m.splice(0);
				}
			});
		}else{
			$.each(gManager, function(index, val){
				managerTplArr.push(insertMenegrs(val));
			});
			$('.cld-manager-wrap').html(managerTplArr);
			$('.cld-manager-wrap').show();
		}
	}

	function getMenegers(proxy,url,callback){
		$.ajax({
			async: false,
			type: 'GET',
			url: url,
			success: function(data) {
				try{
					callback(data);
				}catch(e){
					callback('');
					console.log('Invalid json string!');
				}
			}
		});
	}
}