@extends('public.admin')
@section('content')
<link href="{{'/public/admin/css/pintuer.css'}}" rel="stylesheet"/>
<div class="view-product">
    <div class="authority">
        <div class="authority-head">
            <div class="manage-head">
                <h6 class="layout padding-left manage-head-con">错误页面
                    <span class="fr text-small text-normal padding-top">发布时间：2016-07-08</span>
                    <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">v1.0.0.0</em></span>
                </h6>
            </div>
        </div>
    <div class="container" style=" margin-top:8%;">
        <div class="panel margin-big-top">
            <div class="text-center">
                <br>
                <div class="">
                    <div class="float-left">
                        <img src="{{'/public/admin/img/ds-1.gif'}}">
                        <div class="alert"> 卧槽！页面不见了！ </div>
                    </div>
                    <div class="float-right">
                        <img src="{{'/public/admin/img/ds-2.png'}}" width="260">
                    </div>
                </div>
                <div class="padding-big">
                    <h2 class="padding-top"> <stong>404错误！抱歉您要找的页面不存在</stong> </h2>
                    <a href="{{url('admin/index')}}" class="button bg-yellow">返回首页</a>
                    <a href="javascript:alert('管理员畏罪潜逃了!')" class="button admin">保证不打死管理员</a>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>

@endsection
