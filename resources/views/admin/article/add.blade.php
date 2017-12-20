@extends('public.admin')
@section('content')
<script type="text/javascript" charset="utf-8" src="{{asset('/resources/org/ueditor/ueditor.config.js')}}"></script>
<script type="text/javascript" charset="utf-8" src="{{asset('/resources/org/ueditor/ueditor.all.min.js')}}"> </script>
<script type="text/javascript" charset="utf-8" src="{{asset('/resources/org/ueditor/lang/zh-cn/zh-cn.js')}}"></script>
<div class="view-product">
    <div class="authority">
        <div class="authority-head">
            <div class="manage-head">
                <h6 class="layout padding-left manage-head-con">新增文章
                    <span class="fr text-small text-normal padding-top">发布时间：2016-07-08</span>
                    <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">v1.0.0.0</em></span>
                    <a href="javascript:history.back(-1)" style="width: 60px;height: 30px;display: inline-block;background-color: #fff;border-radius: 5px;text-align: center;line-height: 30px">
                        <span style="font-size: 13px;" class="fa fa-arrow-circle-left">返回</span>
                    </a>
                </h6>
            </div>
        </div>
        <!--  表单start  -->
        <div class="form_main">
        <form class="layui-form layui-form-pane" action="{{url('admin/article/store')}}" method="post">
            <input type="hidden" name="art_author" value="{{session('admin.user_id')}}">
            {{csrf_field()}}
            @if(count($errors)>0)
            <div class="mark">
                @if(is_object($errors) )
                @foreach($errors->all() as $error)
                <p>{{$error}}</p>
                @endforeach
                @else
                <p>{{$errors}}</p>
                @endif
            </div>
            @endif
            <div class="layui-form-item">
                <label class="layui-form-label">文章标题</label>
                <div class="layui-input-inline">
                    <input type="text" name="art_title" lay-verify="required" placeholder="请输入文章标题" autocomplete="off" class="layui-input" style="width: 350px">
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <label class="layui-form-label">所属栏目</label>
                <div class="layui-input-block" style="width: 250px;">
                    <select name="art_type" lay-filter="aihao" style="width: 250px;">
                        <option value=""></option>
                        <option value="1" selected="">php</option>
                        <option value="2">nginx</option>
                        <option value="3">mysql</option>
                        <option value="4">java</option>
                    </select>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <label class="layui-form-label">Tag标签</label>
                <div class="layui-input-block" style="width: 250px;">
                    <select name="art_tag" lay-filter="aihao" style="width: 250px;">
                        <option value=""></option>
                        <option value="1" selected="">nginx</option>
                        <option value="2">php</option>
                        <option value="3">mysql</option>
                        <option value="4">java</option>
                    </select>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <label class="layui-form-label">缩略图</label>
                <div class="layui-input-block" style="width: 550px;">
                    <input type="text" size="50" name="art_org" value="{{old('art_org')}}" style="width: 350px;height: 38px;border: 1px solid gainsboro">
                    <input type="hidden" size="50" name="art_img" value="{{old('art_img')}}">
                    <input type="hidden" size="50" name="art_thumb" value="{{old('art_thumb')}}">
                    <input id="file_upload" name="file_upload" type="file" multiple="true" class="layui-input">
                    <script src="{{asset('/resources/org/uploadify/jquery.uploadify.min.js')}}" type="text/javascript"></script>
                    <link rel="stylesheet" type="text/css" href="{{asset('/resources/org/uploadify/uploadify.css')}}">
                    <script type="text/javascript">
                        <?php $timestamp = time();?>
                        $(function() {
                            $('#file_upload').uploadify({
                                'buttonText' : '图片上传',
                                'formData'     : {
                                    'timestamp' : '<?php echo $timestamp;?>',
                                    '_token'     : "{{csrf_token()}}"
                                },
                                'swf'      : "{{asset('/resources/org/uploadify/uploadify.swf')}}",
                                'uploader' : "{{url('admin/upload')}}",
                                'onUploadSuccess' : function(file, data, response) {
                                    var json = JSON.parse(data);

                                    $('input[name=art_org]').val(json.org);
                                    $('#art_thumb_img').attr('src','/'+ json.org);

                                    $('input[name=art_img]').val(json.img);
                                    $('input[name=art_thumb]').val(json.thumb);

                                }
                            });
                        });
                    </script>
                    <style>
                        .uploadify{display:inline-block;}
                        .uploadify-button{border:none; border-radius:5px; margin-top:0px;}
                        table.add_tab tr td span.uploadify-button-text{color: #FFF; margin:0;}
                    </style>
                </div>
            </div>
            <div class="layui-form-item" pane="" style="width: 255px">
                <label class="layui-form-label">是否显示</label>
                <div class="layui-input-block" style="width: 255px">
                    <input type="radio" name="art_open" value="1" title="是" checked="">
                    <input type="radio" name="art_open" value="0" title="否">
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item" pane="" style="width: 285px">
                <label class="layui-form-label">文章属性</label>
                <div class="layui-input-block" style="width: 285px">
                    <input type="radio" name="art_status" value="1" title="推荐"  checked="">
                    <input type="radio" name="art_status" value="0" title="置顶" >
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <label class="layui-form-label">文章内容</label>
                <div class="layui-input-block" style="width: 250px;">
                    <script id="editor" name="art_content" value="{{old('art_content')}}" type="text/plain" style="width:960px;height:400px;"></script>
                    <script type="text/javascript">
                        //实例化编辑器
                        var ue = UE.getEditor('editor');
                    </script>
                    <style>
                        #edui1{
                            width: 961px;
                        }
                    </style>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <input type="submit" value="提交" class="layui-btn layui-btn-normal layui-btn-radius" id="" style="height: 32px;line-height: 32px">
                <input type="reset" value="清空" class="layui-btn layui-btn-normal layui-btn-radius" id="" style="height: 32px;line-height: 32px;background-color: gainsboro">
            </div>
        </form>
        </div>
        <!--  表单end  -->
    </div>
</div>
<script>
    layui.use(['form', 'layedit', 'laydate'], function(){
        var form = layui.form()
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate;
        //监听指定开关
        form.on('switch(switchTest)', function(data){
            layer.msg('开关checked：'+ (this.checked ? 'true' : 'false'), {
                offset: '6px'
            });
            layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
        });
    });
</script>

@endsection
