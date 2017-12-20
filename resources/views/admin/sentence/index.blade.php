@extends('public.admin')
@section('content')
<div class="view-product">
    <div class="authority">
        <div class="authority-head">
            <div class="manage-head">
                <h6 class="layout padding-left manage-head-con">段子列表
                    <span class="fr text-small text-normal padding-top">发布时间：2016-07-08</span>
                    <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">v1.0.0.0</em></span>
                </h6>
            </div>
        </div>
        <!--  表单搜索  -->
        <div class="form_main" >
            <form action="{{url('admin/article')}}" method="post" class="" id="">
                {{csrf_field()}}
                <div class="layui-form-pane" style="display: inline-block;margin-bottom: -13px">
                    <div class="layui-form-item">
                        <label class="layui-form-label">截止日期</label>
                        <div class="layui-input-inline">
                            <input class="layui-input inpun_focus" name="navigation_starttime" placeholder="开始日" id="LAY_demorange_s" value="">
                        </div>
                        <div class="layui-input-inline">
                            <input class="layui-input inpun_focus" name="navigation_endtime" placeholder="截止日" id="LAY_demorange_e" value="">
                        </div>
                    </div>
                </div>

                <div class="form_input">
                    <input type="text" name="navigation_name" class="keyword inpun_focus" placeholder="请输入关键字"  value="">
                </div>
                <div class="form_button">
                    <input type="submit" value="搜索" class="layui-btn layui-btn-normal" style="">
                </div>
                <div class="form_right">
                    <div class="rush">
                        <a href="{{url('admin/article')}}"><span class="layui-btn layui-btn-normal"><span class="fa fa-refresh"></span></span></a>
                    </div>
                    <div class="add">
                        <a href="{{url('admin/article/add')}}"><span class="add_btn layui-btn layui-btn-normal">＋新增段子</span></a>
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
                            <col width="150">
                            <col width="100">
                            <col width="100">
                            <col width="100">
                            <col width="300">
                            <col width="150">
                            <col width="150">
                            <col width="200">
                            <col width="180">
                        </colgroup>
                        <thead>
                        <tr>
                            <th><input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose"></th>
                            <th>用户名</th>
                            <th>手机号</th>
                            <th>性别</th>
                            <th>等级</th>
                            <th>个性签名</th>
                            <th>注册时间</th>
                            <th>更新时间</th>
                            <th>最近登陆</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($data as $v)
                        <tr>
                            <td><input type="checkbox" name="" lay-skin="primary" value="{{$v->art_id}}"></td>
                            <td>{{$v->user_name}}</td>
                            <td>{{$v->user_phone}}</td>
                            <td>{{$v->user_sex}}</td>
                            <td>{{$v->user_name}}</td>
                            <td>{{$v->user_name}}</td>
                            <td>{{$v->user_name}}</td>
                            <td>{{$v->user_name}}</td>
                            <td>{{$v->user_name}}</td>
                            <td>
                                <a href="javascript:;" artid="{{$v->art_id}}" class="del_btn"><span class="layui-btn layui-btn-small layui-btn-normal"><i class="layui-icon"></i> 删除</span></a>
                                <a href="{{url('admin/article/'.$v->art_id.'/edit')}}"><span class="layui-btn layui-btn-small layui-btn-normal"><i class="layui-icon"></i> 编辑</span></a>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            <div class="show-page padding-big-right">
                <div class="page">
                    <div class="page">
                        <ul class="offcial-page margin-top margin-big-right">
                            <li>共<em class="margin-small-left margin-small-right">1</em>条数据</li>
                            <li>每页显示<em class="margin-small-left margin-small-right">15</em>条</li>
                            <li><a class="next disable">上一页</a></li>
                            <li></li>
                            <li><a class="next disable">下一页</a></li>
                            <li><span class="fl">共<em class="margin-small-left margin-small-right">1</em>页</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
