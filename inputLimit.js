/**
 * Created by Administrator on 2016/11/17.
 */
// 输入框input 限制（参数：字符串。如：'.class' / '#id'）
var inputLimit = ( function($){
    return{

        //【判断】

        // 输入框 判空（空返回true)
        judgeEmpty: function( item ){
            var _val = $.trim( $(item).val() ); // 去掉前后所有空格的字符串
            return (  !_val.length  ||  _val == null  ||  _val == undefined );
        },

        // 输入框 判断输入是否为整数（是返回true)
        judgeInt: function( item ){
            var _val = $.trim( $(item).val() ); // 去掉前后所有空格的字符串
            return( parseInt(_val) == parseFloat(_val) );
        },


        //【限制】

        // 非空（空则 修改input样式，并且返回false。在 submit前 使用）
        inputNotEmpty: function( item ){
            if( inputLimit.judgeEmpty( item ) ){ // 判空

                // 修改placeholder 内容
                var _placeholder = $(item).attr('placeholder');
                if( _placeholder.indexOf('请输入：') == -1 ) $(item).attr( 'placeholder', '请输入：' + _placeholder );

                // 修改placeholder 样式，输入框 获得焦点
                $(item).addClass('inputErrorTip').val('').focus();
                return false;
            }
            else return true;
        },

        // 整数
        inputInt: function( item ){
            $(item).attr('type', 'number');

            // 失去焦点时，自动调整输入内容
            $(document).on('blur', item, function(){
                var _val = $.trim( $(this).val() ); // 去掉前后所有空格的字符串
                if( _val.length ) $(this).val( parseInt(_val) );// 有输入，取整
            });
        },

        // 某个范围的数字
        inputRange: function( item, min, max ){
            $(item).attr('type', 'number');

            // 失去焦点时，自动调整输入内容
            $(document).on('blur', item, function(){
                var _val = $.trim( $(this).val() ); // 去掉前后所有空格的字符串

                if( _val.length ){// 有输入
                    if( min != undefined  &&  _val < min ) $(this).val( min );
                    else if( max != undefined  &&  _val > max ) $(this).val( max );
                }
            });
        },

        // 保留 若干位小数（参数：小数位数）
        inputToFixed: function( item, num ){
            $(item).attr('type', 'number');

            // 失去焦点时，自动调整输入内容
            $(document).on('blur', item, function(){
                var _val = $.trim( $(this).val() ); // 去掉前后所有空格的字符串

                if( _val.length ){// 有输入
                    _val = parseFloat( $(this).val() ).toFixed( num );// 超出的小数 四舍五入
                    $(this).val( _val );
                }
            });
        },

        // 输入字数 限制（参数：字数）
        inputTextNum: function( item, num ){

            $(item).attr('maxlength', num);// 若input是js临时创建的，该设置对其无效，改为：

            // 输入框 获取焦点的时候，设置 输入字数限制
            $(document).on('focus', item, function(){
                $(this).attr('maxlength', num);
            });
        },

        // 默认显示（内容为空时，设置默认内容，否则显示用户输入内容）
        inputTextDefault: function( item, defaultText ){

            // 得到焦点时，判断是否为默认内容。是则清空，否则全选内容（方便用户修改）
            $(document).on('focus', item, function(){
                var _val = $.trim( $(this).val() ); // 去掉前后所有空格的字符串
                if( _val == defaultText ) $(this).val(''); // 清空默认内容
                else $(this)[0].select();// 全选
            });

            // 失去焦点时，自动调整输入内容
            $(document).on('blur', item, function(){
                var _val = $.trim( $(this).val() ); // 去掉前后所有空格的字符串
                if( !_val.length ) $(this).val( defaultText ); // 没输入
            });

            $(item).trigger('blur');// 初始化 显示内容
        },

        // 字符串 取代

    }
})( jQuery );
