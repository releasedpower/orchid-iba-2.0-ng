<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
class TokenGenerator extends Model
{
    use HasFactory;

    public function generateAndInsert($iba_vcodecli){
        date_default_timezone_set('Africa/Nairobi');
        $hashed=hash('sha256',$iba_vcodecli . strval(now()));
        $expirationDate= now()->modify('+120 minute');
        $expirationDate= str_replace('T',' ',$expirationDate);
        $expirationDate= str_replace('Z','',$expirationDate);

        DB::connection('sipem_iba')
            ->table('login_token')
            ->insert([
                'token_id'=>null,
                'token_value'=>$hashed,
                'token_expiration'=>$expirationDate,
                'iba_vcodecli'=>$iba_vcodecli
            ]
        );
        $result[0]=$hashed;
        $result[1]=$expirationDate;
        return $result;
    }
    function verifyToken($tokenOwnerId,$tokenValue){
        date_default_timezone_set('Africa/Nairobi');
        $dbResult=DB::connection('sipem_iba')
            ->table('login_token')
            ->select()
            ->where('token_value',$tokenValue)
            // ->where('iba_vcodecli',$tokenOwnerId)
            ->first();

        if(!$dbResult){
            return 'Token or user not found';
        }
        else if(($dbResult->token_expiration)<now()){
            return 'expired';
        }
        else return 'valid';
    }

    function getTokenByIdClient(Request $request){
        $fields= $request->validate([
            'iba_vcodecli'=>'required'
        ]);
        $dbResult=DB::table('client_token')
            ->select()
            ->where('iba_vcodecli',$fields['iba_vcodecli'])
            ->first();

        $response= [
            'token_value'=> $dbResult->token_value,
            'iba_vcodecli'=> $dbResult->iba_vcodecli,
            'token_expiration'=>$dbResult->token_expiration
        ];
        return response($response,201);
    }
}
