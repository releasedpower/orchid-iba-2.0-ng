<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\TokenGenerator;

class CheckLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $tokenOwnerId=$request->userId;
        $tokenValue=$request->bearerToken();
        $tokenClass=new TokenGenerator();

        $verificationResult=$tokenClass->verifyToken($tokenOwnerId,$tokenValue);
        if($verificationResult!='valid'){
            return response([
                'error'=>$verificationResult
            ]);
        }
        else return $next($request);
    }
}
