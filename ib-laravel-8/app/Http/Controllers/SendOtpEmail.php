<?php

namespace App\Http\Controllers;

use App\Mail\OtpEmail;
use Illuminate\Http\Request;
use Mail;

class SendOtpEmail extends Controller
{
    public function sendOtpEmail(Request $request)
    {
        // Generate the OTP code
        $otp = mt_rand(100000, 999999);
    
        // Save the OTP code to the user's session
        $request->session()->put('otp', $otp);
    
        // Send the OTP code to the user's email
        $email = $request->user()->email;
        Mail::to($email)->send(new OtpEmail($otp));
    
        // Redirect the user to the OTP verification form
        return redirect('/verify-otp');
    }
}
