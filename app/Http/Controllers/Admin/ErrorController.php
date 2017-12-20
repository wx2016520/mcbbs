<?php

namespace App\Http\Controllers\Admin;


use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ErrorController extends Controller
{
    //错误页面Controller
    public function errorpage()
    {

        return view('admin.error');
    }
}
