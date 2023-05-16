<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class ClientModel extends Model
{
    use HasFactory;
    function getSolde($userId){
        $response=null;
        if ($userId){
            $queryResult=DB::table('contrat')
                ->select('cpt_vcodeclt','cpt_vcode','cpt_vbanque','cpt_vbranche','cpt_vrib','cpt_vlib','cpt_fsolde','cpt_vcodepep')
                ->where('cpt_vcodeclt',$userId)
                ->get();

            for($i=0;$i<count($queryResult);$i++){
                $response[$i]= [
                    'cpt_vcodeclt'=>$queryResult[$i]->cpt_vcodeclt,
                    'cpt_vcode'=>$queryResult[$i]->cpt_vcode, //code compte
                    'cpt_vbanque'=>$queryResult[$i]->cpt_vbanque,
                    'cpt_vbranche'=>$queryResult[$i]->cpt_vbranche,
                    'cpt_vrib'=>$queryResult[$i]->cpt_vrib,
                    'cpt_vlib'=>$queryResult[$i]->cpt_vlib, //nom du compte
                    'cpt_vcodepep'=>$queryResult[$i]->cpt_vcodepep, //type du compte
                    'cpt_fsolde'=>number_format($queryResult[$i]->cpt_fsolde, 0, '.', ' '), //solde
                ];  
            }  
            return $response;
        }
        else return ['erreur' => 'no user value found in getSolde( .. )'];
    }

    function getCompteById($compteId){
        $response = DB::select(DB::raw("
        select 
            clt_vnom,
            ind_vprenom,
            cpt_vcode,
            cpt_vbanque,
            cpt_vbranche,
            cpt_vrib
        from individu 
            join clientele as cli on individu.ind_vcodeclt = cli.clt_vcli
            join contrat on individu.ind_vcodeclt = contrat.cpt_vcodeclt
        where contrat.cpt_vcode = {$compteId}
    "));
    return $response;
    }

    function getClientById($userId){
        $response=null;
        $queryResult=null;
        if($userId){
            $queryResult=DB::table('clientele')
                ->select()
                // ->select('clt_vcli','clt_vnom','clt_vtype','clt_vgenre')
                ->where('clt_vcode',$userId)
                ->get();
  
            return $queryResult;   
        }
        else return ['erreur' => 'no user value found in getInfo()'];
    }
    function getTransactions($compteId){
        $response=null;
        $queryResult=null;
        if($compteId){
            $queryResult=DB::table('mvt')
                ->select('mvt_inum','mvt_vlib','mvt_fmontantsigne','mvt_dsys','mvt_tsys','mvt_vcodetra')
                // ->where('mvt_vcodecpt',$compteId)
                ->where('mvt_vcodecpt',$compteId)
                ->orderBy('mvt_inum','desc')
                ->limit(10)
                ->get();
            for($i=0;$i<count($queryResult);$i++){
                $response[$i]= [
                    'transId'=>$queryResult[$i]->mvt_inum,
                    'description'=>$queryResult[$i]->mvt_vlib,
                    'montant'=>number_format($queryResult[$i]->mvt_fmontantsigne, 0, '.', ' '),
                    'date'=>$queryResult[$i]->mvt_dsys,
                    'time'=>$queryResult[$i]->mvt_tsys ,
                    'transType'=>$queryResult[$i]->mvt_vcodetra
                ];  
            }    
            return $response;   
        }
        else return ['erreur' => 'no user value found in getTransactions()'];
    }
    function getTransactionsWithBalance($compteId) {
        $transactions = DB::table('mvt')
            ->select('mvt_inum', 'mvt_fmontantsigne', 'mvt_ddate', 'mvt_vcodetra', 'mvt_vlib','mvt_dsys')
            ->where('mvt_vcodecpt', $compteId)
            ->orderBy('mvt_dsys', 'asc')
            ->orderBy('mvt_inum', 'asc')
            ->get();
    
        $balance = 0;
        $valiny = [];
    
        $transactions->each(function ($transaction) use (&$balance, &$valiny) {
            $balance += $transaction->mvt_fmontantsigne;
    
            $valiny[] = [
                'mvt_inum' => $transaction->mvt_inum,
                'mvt_ddate' => $transaction->mvt_ddate,
                'mvt_fmontantsigne' => $transaction->mvt_fmontantsigne,
                'mvt_vlib' => $transaction->mvt_vlib,
                'mvt_vcodetra' => $transaction->mvt_vcodetra,
                'balance' => $balance,
                'mvt_dsys' => $transaction->mvt_dsys,
            ];
        });
    
        return array_reverse($valiny);
    }
    
    function getDepensesMois($compteId){
        $response = DB::select(DB::raw("

        SELECT SUM(mvt_fmontantsigne) as depenses FROM mvt WHERE mvt_vcodecpt = {$compteId} AND MONTH(mvt_dsys) = MONTH(NOW())
        AND YEAR(mvt_dsys) = YEAR(NOW())
        AND mvt_fmontantsigne < 0;
    "));
        return $response;
    }
    function getRecettesMois($compteId){
        $response = DB::select(DB::raw("

        SELECT SUM(mvt_fmontantsigne) as recettes FROM mvt WHERE mvt_vcodecpt = {$compteId} AND MONTH(mvt_dsys) = MONTH(NOW())
        AND YEAR(mvt_dsys) = YEAR(NOW())
        AND mvt_fmontantsigne > 0;
    "));
        return $response;
    }
    function getEmail($userId){
        $response = DB::select(DB::raw("
            select clt_vmail 
            from clientele 
            where clt_vcli = {$userId}
        "));

        return $response[0]->clt_vmail;
    }
}
