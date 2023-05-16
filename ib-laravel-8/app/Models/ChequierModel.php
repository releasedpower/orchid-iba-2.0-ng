<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Response;

class ChequierModel extends Model
{
    use HasFactory;
    function addDemandeChequier($data)
    {
        $lastInsertedId = $this->lastInsertDemande();
        date_default_timezone_set('Africa/Nairobi');
        if ($data) {
            try {
                DB::connection('gestion_chequier')
                    ->table('chequier')
                    ->insert([
                        'chq_iid_demande' => $lastInsertedId + 1,
                        'chq_ddate_demande' => date('Y-m-d'),
                        'chq_vcode_banque' => $data['chq_vcode_banque'],
                        'chq_vcode_agence' => $data['chq_vcode_agence'],
                        'chq_vcode_compte' => $data['chq_vcode_compte'],
                        'chq_vtype_compte' => $data['chq_vtype_compte'],
                        'chq_vrib' => $data['chq_vrib'],
                        'chq_vcode_cli' => $data['chq_vcode_cli'],
                        'chq_vnom_client' => $data['chq_vnom_client'],
                        'chq_vadresse_client' => $data['chq_vadresse_client'],
                        'chq_vquartier_client' => $data['chq_vquartier_client'],
                        'chq_vcommune_client' => $data['chq_vcommune_client'],
                        'chq_vtype_carnet' => $data['chq_vtype_carnet'],
                        'chq_inombre_carnet' => $data['chq_inombre_carnet'],
                        'chq_ireste' => $data['chq_ireste'],
                        'chq_vtype_chequier' => $data['chq_vtype_chequier'],
                        'chq_vmoyen_livraison' => 'Récupération',
                        'chq_vstatut' => 'CHQ_DEMANDE_RECU',
                        'chq_iid_commande' => 0,
                        //Napetrako mandrapa
                        'chq_vmandataire' => '',
                        //Napetrako mandrapa
                        'chq_vcin_mandataire' => '',
                        //Napetrako mandrapa
                        'chq_ilivre' => 0, //Mandrapa
                        'chq_vagence_recup' => $data['chq_vagence_recup'],
                        'chq_ddate_commande' => date('Y-m-d') //Napetrako mandrapa
                    ]);
                return response(['message' => 'success']);
            } catch (QueryException $e) {
                return $e->getMessage();
            }
        }
    }
    function lastInsertDemande()
    {
        $lastInsertedId = DB::connection('gestion_chequier')
            ->table('chequier')
            ->select('chq_iid_demande')
            ->orderBy('chq_iid_demande', 'desc')
            ->limit(1)
            ->first();
        return $lastInsertedId->chq_iid_demande;
    }
    function deleteDemandeChequier($id)
    {
        if ($id) {
            try {
                DB::connection('gestion_chequier')
                    ->delete("DELETE FROM chequier where chq_iid_demande = ?", [$id]);
                return response()->json('Deleted', 204);
            } catch (\Throwable $th) {
                return response('Error during deletion');
            }
        }
        return 'no id value in delete demande chequier';
    }
    function getDemandesChequier($id)
    {
        $result = DB::connection('gestion_chequier')
            ->table('chequier')
            ->where('chq_vcode_cli',$id)
            ->get();
        return $result;
    }
    function getDemandesChequierByCompte($compteId){
        return DB::connection('gestion_chequier')
                ->select(DB::raw("
                    select 
                        * 
                    from chequier 
                    join type_chequier on chequier.chq_vtype_chequier = type_chequier.chq_vcode
                    where chq_vcode_compte = {$compteId}
                    order by chq_ddate_demande desc
                "));
    }
    function getTypeCarnet(){
        $result = DB::connection('gestion_chequier')
        ->select(DB::raw("
            select 
                * 
            from type_carnet
            order by car_vlibelle asc
    "));
    return $result;
    }
    function getTypeChequier(){
        $result = DB::connection('gestion_chequier')
        ->table('type_chequier')
        ->get();
    return $result;
    }
}

