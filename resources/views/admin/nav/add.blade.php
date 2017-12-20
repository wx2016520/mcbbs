@extends('public.admin')
@section('content')
<div class="view-product">
    <div class="authority">
        <div class="authority-head">
            <div class="manage-head">
                <h6 class="layout padding-left manage-head-con">新增导航
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
        <form class="layui-form layui-form-pane" action="{{url('admin/nav/store')}}" method="post">
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
                <label class="layui-form-label">导航名称</label>
                <div class="layui-input-inline">
                    <input type="text" name="navigation_name" lay-verify="required" placeholder="请输入导航名称" autocomplete="off" class="layui-input">
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <label class="layui-form-label">导航地址</label>
                <div class="layui-input-inline">
                    <input type="text" name="navigation_url" placeholder="请输入地址" autocomplete="off" class="layui-input" style="width: 250px;">
                </div>
                <div class="layui-form-mid layui-word-aux"></div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <label class="layui-form-label">导航类型</label>
                <div class="layui-input-block" style="width: 250px;">
                    <select name="navigation_type" lay-filter="aihao" style="width: 250px;">
                        <option value=""></option>
                        <option value="1" selected="">首页导航</option>
                        <option value="2">底部导航</option>
                        <option value="3">主页导航</option>
                        <option value="4">用户导航</option>
                    </select>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">父id</label>
                    <div class="layui-input-inline">
                        <input type="number" name="navigation_fid" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">导航排序</label>
                    <div class="layui-input-inline">
                        <input type="number" name="navigation_order" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item" pane="" style="width: 255px">
                <label class="layui-form-label">是否开启</label>
                <div class="layui-input-block" style="width: 255px">
                    <input type="radio" name="navigation_open" value="1" title="是" checked="">
                    <input type="radio" name="navigation_open" value="0" title="否">
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item" pane="" style="width: 255px">
                <label class="layui-form-label">新开窗口</label>
                <div class="layui-input-block" style="width: 255px">
                    <input type="radio" name="navigation_window" value="1" title="是"  >
                    <input type="radio" name="navigation_window" value="0" title="否" checked="">
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
