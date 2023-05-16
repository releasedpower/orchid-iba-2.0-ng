<?php

namespace App\Http\Controllers;

use App\Mail\OtpEmail;
use App\Models\ClientModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\TokenGenerator;
use Mail;

class AuthController extends Controller
{
	const SALT = 'lDmPPso3Azx9wMwFcO';
	const IV = '0010110100010110';
	/**
	 * Handle the incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */

	// public function __invoke(Request $request){}

	function login(Request $request)
	{
		$tokenG = new TokenGenerator();
		$fields = $request->validate([
			'identifiant' => ['required', 'string'],
			'mdp' => ['required']
		]);

		$user = DB::table('client_internet_banking')
			->where('iba_vlogin', $fields['identifiant'])
			->first();

		if (!$user || ($this->_encrypt_string($fields['mdp']) != $user->iba_vmdp)) {
			return response([
				'error' => 'diso',
				'typedIn' => $this->_encrypt_string($fields['mdp'])
			], 401);
		} 
		else {
			$clientModel = new ClientModel();
			if($clientModel->getEmail($user->iba_vcodecli)){
				$otp = mt_rand(100000, 999999);
				$request->session()->put('otp', $otp);
				$email = $clientModel->getEmail($user->iba_vcodecli);
				// Mail::to($email)->send(new OtpEmail($otp));

				$request->session()->put('identifiant', $user->iba_vlogin);
				$request->session()->put('mdp', $user->iba_vmdp);
			}
			$clientToken = $tokenG->generateAndInsert($user->iba_vcodecli);
			$response = [
				'userId' => $user->iba_vcodecli,
				'userLogin' => $user->iba_vlogin,
				'accessToken' => $clientToken[0],
				'expirationDate' => $clientToken[1],
				// 'email'=>$email,
				'otp'=>session()->get('otp'),
				'identifiant'=>session()->get('identifiant'),
				'mdp'=>session()->get('mdp')
			];
			return response($response, 201);
		}
	}
	function loginWith2FA(Request $request){
		$otp = session()->get('otp');
		$identifiant = session()->get('identifiant');
		$mdp = session()->get('mdp');
		if($otp==$request->otp && $identifiant==$request->identifiant && $mdp==$this->_encrypt_string($request->mdp)){

			$tokenG = new TokenGenerator();
			$user = DB::table('client_internet_banking')
			->where('iba_vlogin', $request->identifiant)
			->first();

			$clientToken = $tokenG->generateAndInsert($user->iba_vcodecli);

			return 'yes';
		}
		return $request;
	}
	function _encrypt_string($str)
	{
		return openssl_encrypt($str, 'aes-256-ctr', self::SALT, OPENSSL_ZERO_PADDING, self::IV);
	}
}