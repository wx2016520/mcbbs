<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //前台登录
    Route::any('login', 'Home\LoginController@login');
    //前台退出登录
    Route::get('loginout', 'Home\LoginController@loginout');
    //前台注册
    Route::any('register', 'Home\RegisterController@register');
    //前台首页
    Route::get('/', 'Home\IndexController@index');
    //前台个人主页-用户介绍
    Route::get('user-about', 'Home\UserCenterController@about');
    //前台个人主页-用户关注
    Route::get('user-following', 'Home\UserCenterController@following');
    //前台个人中心-我的话题
    Route::get('mytopic', 'Home\UserCenterController@mytopic');
    //前台个人设置
    Route::get('setting', 'Home\UserCenterController@setting');
    //后台-登录
    Route::any('admin/login', 'Admin\LoginController@login');
    //后台-登录验证码
    Route::get('admin/code', 'Admin\LoginController@code');
    //后台-退出
    Route::get('admin/loginout', 'Admin\LoginController@loginout');
    //后台-首页
    Route::get('admin/index', 'Admin\IndexController@index');
    //后台-首页home
    Route::get('admin/home', 'Admin\IndexController@home');
	//后台-导航
    Route::any('admin/nav', 'Admin\NavController@index');
	//后台-导航新增
    Route::get('admin/nav/add', 'Admin\NavController@create');
	//后台-导航新增保存
    Route::post('admin/nav/store', 'Admin\NavController@store');
	//后台-导航编辑
    Route::get('admin/nav/{id}/edit', 'Admin\NavController@edit');
	//后台-导航更新
    Route::any('admin/nav/update/{id}', 'Admin\NavController@update');

    //后台-导航
    Route::any('admin/banner', 'Admin\BannerController@index');

	//后台-导航删除
    Route::any('admin/nav/destroy/{id}', 'Admin\NavController@destroy');
	//后台-友情链接
    Route::get('admin/link', 'Admin\LinkController@index');
	//后台-用户列表
    Route::get('admin/user', 'Admin\UserController@index');
	//后台-文章列表
    Route::any('admin/article', 'Admin\ArticleController@index');
	//后台-文章列表
    Route::any('admin/article', 'Admin\ArticleController@index');
//	//后台-文章测试
//    Route::any('admin/article/{id}', 'Admin\ArticleController@test');

    //后台-文章新增
    Route::get('admin/article/add', 'Admin\ArticleController@create');
    //后台-文章新增保存
    Route::post('admin/article/store', 'Admin\ArticleController@store');
    //后台-文章编辑
    Route::get('admin/article/{id}/edit', 'Admin\ArticleController@edit');
    //后台-文章更新
    Route::any('admin/article/update/{id}', 'Admin\ArticleController@update');
    //后台-文章删除
    Route::any('admin/article/destroy/{id}', 'Admin\ArticleController@destroy');

	//后台-段子列表
    Route::get('admin/sentence', 'Admin\SentenceController@index');
    //文件上传
    Route::any('admin/upload','Admin\CommonController@upload');
    //错误页面
    Route::get('admin/error','Admin\ErrorController@errorpage');
    //前台首页导航
    Route::get('header','Home\IndexController@header');
    //前台段子
    Route::get('sentence','Home\SentenceController@index');
    //前台关于我们
    Route::get('about','Home\AboutController@index');
    //前台最新动态
    Route::get('article','Home\ArticleController@index');
    //前台最新动态详情
    Route::get('article/detail/{id}','Home\ArticleController@show');
    //前台
    Route::get('scenery','Home\SceneryController@index');
    //前台
    Route::get('news','Home\NewsController@index');
    //前台
    Route::get('active','Home\ActiveController@index');
    //前台
    Route::get('active/detail','Home\ActiveController@detail');
    //前台
    Route::get('test','Home\TestController@index');
    //前台微信
    Route::get('weixin','Home\WeixinController@index');
    //前台QQ登录
    Route::get('qqlogin','Home\LoginController@qqLogin');
    //前台QQ登录回调地址
    Route::get('qqcallback','Home\LoginController@qqcallback');
    //前台
    Route::get('video','Home\VideoController@index');
    //前台
    Route::get('video/detail','Home\VideoController@detail');
});

