@extends('public.admin')
@section('content')
<div class="view-product">
    <div class="authority">
        <div class="authority-head">
            <div class="manage-head">
                <h6 class="layout padding-left manage-head-con">标签列表
                    <span class="fr text-small text-normal padding-top">发布时间：2016-07-08</span>
                    <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">v1.0.0.0</em></span>
                </h6>
            </div>
        </div>
        <!--  表单搜索  -->
        <div class="form_main" >
            <form action="{{url('admin/article/tag')}}" method="post" class="" id="">
                {{csrf_field()}}
                <div class="form_input">
                    <input type="text" name="tag_name" class="keyword inpun_focus" placeholder="请输入标题关键字"  value="{{$keywords['tag_name']}}">
                </div>
                <div class="form_button">
                    <input type="submit" value="搜索" class="layui-btn layui-btn-normal" style="">
                </div>
                <div class="form_right">
                    <div class="rush">
                        <a href="{{url('admin/article/tag')}}"><span class="layui-btn layui-btn-normal"><span class="fa fa-refresh"></span></span></a>
                    </div>
                    <div class="add">
                        <a href="{{url('admin/article/tag/add')}}"><span class="add_btn layui-btn layui-btn-normal">＋新增标签</span></a>
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
                            <col width="250">
                            <col width="200">
                            <col width="200">
                            <col width="200">
                            <col width="200">
                            <col width="180">
                        </colgroup>
                        <thead>
                        <tr>
                            <th><input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose"></th>
                            <th>标签编号</th>
                            <th>标签标题</th>
                            <th>标签状态</th>
                            <th>操作者</th>
                            <th>添加时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($data as $v)
                        <tr>
                            <td><input type="checkbox" name="" lay-skin="primary" value="{{$v->tag_id}}"></td>
                            <td>{{$v->tag_id}}</td>
                            <td>{{$v->tag_name}}</td>
                            <td> @if($v->tag_status==1) 显示 @else 关闭  @endif</td>
                            <td>{{$v->user_name}}</td>
                            <td>{{$v->tag_time}}</td>
                            <td>
                                <a href="javascript:;" artid="{{$v->tag_id}}" class="del_btn"><span class="layui-btn layui-btn-small layui-btn-normal"><i class="layui-icon"></i> 删除</span></a>
                                <a href="{{url('admin/article/tag/'.$v->tag_id.'/edit')}}"><span class="layui-btn layui-btn-small layui-btn-normal"><i class="layui-icon"></i> 编辑</span></a>
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
        layer.confirm('您确定要删除此标签吗？', {
            btn: ['确定','取消'] //按钮
        }, function(){
            $.post("{{url('admin/article/tag/destroy')}}/"+id, { "_token": "{{csrf_token()}}", "_method": "delete"},
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
    <!-- 显示时间插件-->
        layui.use('laydate', function(){
            var laydate = layui.laydate;

            var start = {
                min: '1900-01-01 00:00:00' //最小日期
                ,max: '2099-06-16 23:59:59'
                ,istoday: false
                ,choose: function(datas){
                    end.min = datas; //开始日选好后，重置结束日的最小日期
                    end.start = datas //将结束日的初始值设定为开始日
                }
            };

            var end = {
                min: laydate.now()
                ,max: '2099-06-16 23:59:59'
                ,istoday: false
                ,choose: function(datas){
                    start.max = datas; //结束日选好后，重置开始日的最大日期
                }
            };

            document.getElementById('LAY_demorange_s').onclick = function(){
                start.elem = this;
                laydate(start);
            }
            document.getElementById('LAY_demorange_e').onclick = function(){
                end.elem = this
                laydate(end);
            }

        });
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
