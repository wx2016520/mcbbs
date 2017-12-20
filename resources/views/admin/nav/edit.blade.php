@extends('public.admin')
@section('content')
<div class="view-product">
    <div class="authority">
        <div class="authority-head">
            <div class="manage-head">
                <h6 class="layout padding-left manage-head-con">编辑导航
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
        <form class="layui-form layui-form-pane" action="{{url('admin/nav/update/'.$data->navigation_id)}}" method="post">
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
            <input type="hidden" name="_method" value="put">
            <div class="layui-form-item">
                <label class="layui-form-label">导航名称</label>
                <div class="layui-input-inline">
                    <input type="text" name="navigation_name" lay-verify="required" placeholder="请输入导航名称" autocomplete="off" class="layui-input" value="{{$data->navigation_name}}">
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <label class="layui-form-label">导航地址</label>
                <div class="layui-input-inline">
                    <input type="text" name="navigation_url" placeholder="请输入地址" autocomplete="off" value="{{$data->navigation_url}}" class="layui-input" style="width: 250px;">
                </div>
                <div class="layui-form-mid layui-word-aux"></div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <label class="layui-form-label">导航类型</label>
                <div class="layui-input-block" style="width: 250px;">
                    <select name="navigation_type" lay-filter="aihao" style="width: 250px;">
                        <option value=""></option>
                        <option value="1" @if($data->navigation_type==1) selected="" @endif>首页导航</option>
                        <option value="2" @if($data->navigation_type==2) selected="" @endif>底部导航</option>
                        <option value="3" @if($data->navigation_type==3) selected="" @endif>主页导航</option>
                        <option value="4" @if($data->navigation_type==4) selected="" @endif>用户导航</option>
                    </select>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">父id</label>
                    <div class="layui-input-inline">
                        <input type="number" name="navigation_fid" autocomplete="off" class="layui-input" value="{{$data->navigation_fid}}">
                    </div>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">导航排序</label>
                    <div class="layui-input-inline">
                        <input type="number" name="navigation_order" autocomplete="off" class="layui-input" value="{{$data->navigation_order}}">
                    </div>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item" pane="" style="width: 255px">
                <label class="layui-form-label">是否开启</label>
                <div class="layui-input-block" style="width: 255px">
                    <input type="radio" name="navigation_open" value="1" title="是" @if($data->navigation_open==1) checked="" @endif>
                    <input type="radio" name="navigation_open" value="0" title="否" @if($data->navigation_open==0) checked="" @endif>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item" pane="" style="width: 255px">
                <label class="layui-form-label">新开窗口</label>
                <div class="layui-input-block" style="width: 255px">
                    <input type="radio" name="navigation_window" value="1" title="是" @if($data->navigation_window==1) checked="" @endif>
                    <input type="radio" name="navigation_window" value="0" title="否" @if($data->navigation_window==0) checked="" @endif>
                </div>
            </div>
            <span class="clear_span" ></span>
            <div class="layui-form-item">
                <input type="submit" value="提交" class="layui-btn layui-btn-normal layui-btn-radius" id="" style="height: 32px;line-height: 32px"  >
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
            var status=$(".navigation_window").val();
            alert(status);
            layer.msg('当前状态：'+ (this.checked ? '开启' : '关闭'), {
                offset: '6px'
            });
            layer.tips('操作成功', data.othis)
        });
    });
</script>

@endsection
