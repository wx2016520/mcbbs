@extends('public.admin')
@section('content')
<div class="view-product">
    <div class="authority">
        <div class="authority-head">
            <div class="manage-head">
                <h6 class="layout padding-left manage-head-con">友情链接
                    <span class="fr text-small text-normal padding-top">发布时间：2016-07-08</span>
                    <span class="fr margin-large-right padding-top text-small text-normal">最新版本：<em class="text-main">v1.0.0.0</em></span>
                </h6>
            </div>
        </div>
        <div class="authority-content">
            <div class="list-content show">
                <div class="offcial-table tr-border margin-big-top clearfix">
                    <div class="tr-th clearfix">
                        <div class="th w10">
                            链接名称
                        </div>
                        <div class="th w10">
                            链接地址
                        </div>
                        <div class="th w10">
                            是否开启
                        </div>
                        <div class="th w10">
                            新开窗口
                        </div>
                        <div class="th w15">
                            链接顺序
                        </div>
                        <div class="th w10">
                            父级id
                        </div>
                        <div class="th w15">
                            更新时间
                        </div>
                        <div class="th w20">
                            操作
                        </div>
                    </div>
                    <div class="tr clearfix border-bottom-none">
                        <div class="td w10">
                            关于我们
                        </div>
                        <div class="td w10">
                            about
                        </div>
                        <div class="td w10">
                            是
                        </div>
                        <div class="td w10">
                            否
                        </div>
                        <div class="td w15">
                            0
                        </div>
                        <div class="td w10">
                            0
                        </div>
                        <div class="td w15">
                            2016-01-10 11:54:07
                        </div>
                        <div class="td w20">
                            <a href="JavaScript:void(0)" msg="您是否删除此站点，如果删除会影响站点通信导致部分功能无法使用？" callback="del_site(624)" data-id="" class="button-word2 btn_ajax_confirm">删除</a>
                        </div>
                    </div>
                </div>
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
