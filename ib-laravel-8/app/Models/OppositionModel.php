<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\QueryException;

class OppositionModel extends Model
{
    use HasFactory;
    function addOpposition($data)
    {
        $lastInsertedId = $this->lastInsertOpposition();
        date_default_timezone_set('Africa/Nairobi');
        if ($data) {
            try {
                DB::connection('gestion_chequier')
                    ->table('opposition')
                    ->insert([
                        'opp_iid' => $lastInsertedId + 1,
                        'opp_ddate' => date('Y-m-d'),
                        'opp_inum_deb' => $data['opp_inum_deb'],
                        'opp_inum_fin' => $data['opp_inum_fin'],
                        'opp_vcode_banque' => $data['opp_vcode_banque'],
                        'opp_vcode_agence' => $data['opp_vcode_agence'],
                        'opp_vcode_compte' => $data['opp_vcode_compte'],
                        'opp_vrib' => $data['opp_vrib'],
                        'opp_vnom_client' => $data['opp_vnom_client'],
                        // 'opp_dvalid' => '1000-01-01',
                        'opp_dsys' => date('Y-m-d'),
                        'opp_tsys' => date('H:i:s'),
                        'opp_vuser' => '',
                        'opp_vmotif' => $data['opp_vmotif'],
                        'opp_fmontant' => $data['opp_fmontant'], 
                        'opp_itype_cheque' => $data['opp_itype_cheque'] // 1 pour signe et 2 pour vierge

                    ]);
                return response(['message' => 'success']);
            } catch (QueryException $e) {
                return $e->getMessage();
            }
        }
    }
    function lastInsertOpposition()
    {
        $lastInsertedId = DB::connection('gestion_chequier')
            ->table('opposition')
            ->select('opp_iid')
            ->orderBy('opp_iid', 'desc')
            ->limit(1)
            ->first();
        return $lastInsertedId->opp_iid;
    }
    function getOppositionTypeCheque()
    {
        $result = DB::connection('gestion_chequier')
        ->select(DB::raw("
            select 
                * 
            from type_cheque_opposition
        "));
        return $result;
    }
    function getOppositionsByCompte($compteId){
        return DB::connection('gestion_chequier')
                ->select(DB::raw("
                    select 
                        * 
                    from opposition 
                    where opp_vcode_compte = {$compteId}
                    order by opp_dsys , opp_tsys desc
                "));
    }
}
