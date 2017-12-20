@extends('public.admin')
@section('content')
<div class="view-product">
    <div class="authority">
        <div class="authority-head">
            <div class="manage-head">
                <h6 class="layout padding-left manage-head-con">导航列表
                    <span class="fr text-small text-normal padding-top">发布时间：2016-07-08</span>
                    <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">v1.0.0.0</em></span>
                </h6>
            </div>
        </div>
        <!--  表单搜索  -->
        <div class="form_main" >
            <form action="{{url('admin/nav')}}" method="post" class="" id="">
                {{csrf_field()}}
                <div class="form_select">
                    <select name="navigation_type" class="select_title inpun_focus">
                        <option value="0" selected="" >导航类型</option>
                        <option value="1" @if($keywords['navigation_type']=="1") selected=""  @endif>首页导航</option>
                        <option value="2" @if($keywords['navigation_type']=="2") selected=""  @endif>底部导航</option>
                        <option value="3" @if($keywords['navigation_type']=="3") selected=""  @endif>主页导航</option>
                        <option value="4" @if($keywords['navigation_type']=="4") selected=""  @endif>用户导航</option>
                    </select>
                </div>
                <div class="form_input">
                    <input type="text" name="navigation_name" class="keyword inpun_focus" placeholder="请输入导航名称关键字"  value="{{$keywords['navigation_name']}}">
                </div>
                <div class="form_button">
                    <input type="submit" value="搜索" class="layui-btn layui-btn-normal" style="">
                </div>
                <div class="form_right">
                    <div class="rush">
                        <a href="{{url('admin/nav')}}"><span class="layui-btn layui-btn-normal"><span class="fa fa-refresh"></span></span></a>
                    </div>
                    <div class="add">
                        <a href="{{url('admin/nav/add')}}"><span class="add_btn layui-btn layui-btn-normal">＋新增导航</span></a>
                    </div>
                </div>
            </form>
        </div>
        <div class="authority-content">
            <div class="list-content show">
                <div class="layui-form">
                    <table class="layui-table">
                        <colgroup>
                            <col width="50">
                            <col width="200">
                            <col width="250">
                            <col width="200">
                            <col width="100">
                            <col width="100">
                            <col width="100">
                            <col width="100">
                            <col width="200">
                            <col width="200">
                        </colgroup>
                        <thead>
                        <tr>
                            <th><input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose"></th>
                            <th>导航名称</th>
                            <th>导航地址</th>
                            <th>导航类型</th>
                            <th>父级id</th>
                            <th>导航排序</th>
                            <th>是否开启</th>
                            <th>新开窗口</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($data as $v)
                        <tr>
                            <td><input type="checkbox" name="" lay-skin="primary" value="{{$v->navigation_id}}"></td>
                            <td>{{$v->navigation_name}}</td>
                            <td>{{$v->navigation_url}}</td>
                            <td>@if($v->navigation_type==1)首页导航 @elseif($v->navigation_type==2)底部导航 @elseif($v->navigation_type==3)主页导航  @elseif($v->navigation_type==4)用户导航@endif</td>
                            <td>{{$v->navigation_fid}}</td>
                            <td>{{$v->navigation_order}}</td>
                            <td>@if($v->navigation_open==1) 是 @else 否 @endif</td>
                            <td>@if($v->navigation_window==1) 是 @else 否 @endif</td>
                            <td>{{$v->navigation_time}}</td>
                            <td>
                                <a href="javascript:;" artid="{{$v->navigation_id}}" class="del_btn"><span class="layui-btn layui-btn-small layui-btn-normal"><i class="layui-icon"></i> 删除</span></a>
                                <a href="{{url('admin/nav/'.$v->navigation_id.'/edit')}}"><span class="layui-btn layui-btn-small layui-btn-normal"><i class="layui-icon"></i> 编辑</span></a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
                <div class="show-page padding-big-right">
                    <nav class=" text-center">
                        {!! $data->render() !!}
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    <!-- 删除按钮 -->
    $(".del_btn").click(function(){
        //询问框
        var id = $(this).attr('artid');
        layer.confirm('您确定要删除此导航吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.post("{{url('admin/nav/destroy')}}/"+id, { "_token": "{{csrf_token()}}", "_method": "delete"},
                function(data) {
                    location.href=location.href;
                    if(data.flag==0)layer.msg(data.msg, {icon: 6}); //信息框-例4
                    if(data.flag==1)layer.msg(data.msg, {icon: 5}); //信息框-例4
                },
                "json"
            );
        }, function(){

        });
    })
    layui.use('form', function(){
        var $ = layui.jquery, form = layui.form();
        //全选
        form.on('checkbox(allChoose)', function(data){
            var child = $(data.elem).parents('table').find('tbody input[type="checkbox"]');
            child.each(function(index, item){
                item.checked = data.elem.checked;
            });
            form.render('checkbox');
        });

    });
</script>
@endsection
