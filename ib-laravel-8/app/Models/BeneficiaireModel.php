<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;


class BeneficiaireModel extends Model
{
    use HasFactory;

    function getBeneficiaires($userId)
    {
        $response = null;
        $queryResult = null;
        if ($userId) {
            // $queryResult = DB::table('beneficiaire')
            //     ->where('ben_vcodecli', $userId)
            //     ->get();

            $queryResult = DB::select(DB::raw("
                select *
                    from beneficiaire 
                where ben_vcodecli = {$userId}
                order by ben_istatut desc
            "));
            for ($i = 0; $i < count($queryResult); $i++) {
                $response[$i] = [
                    'ben_iindex' => $queryResult[$i]->ben_iindex,
                    'ben_vnom' => ucfirst(strtolower($queryResult[$i]->ben_vnom)),
                    'ben_vprenom' => ucfirst(strtolower($queryResult[$i]->ben_vprenom)),
                    'ben_vbanquecpt' => ucfirst(strtolower($queryResult[$i]->ben_vbanquecpt)),
                    'ben_vbranchecpt' => ucfirst(strtolower($queryResult[$i]->ben_vbranchecpt)),
                    'ben_vribcpt' => ucfirst(strtolower($queryResult[$i]->ben_vribcpt)),
                    'ben_vcodecpt' => $queryResult[$i]->ben_vcodecpt,
                    'ben_istatut' => $queryResult[$i]->ben_istatut,
                ];
            }
            if ($response == null) {
                return ['message' => 'no data'];
            }
        }
        return $response;
    }
    function getBeneficiaireById($id){
        $response = DB::select(DB::raw("
        select ben_iindex,ben_vnom,ben_vprenom,ben_vbanquecpt,ben_vbranchecpt,ben_vribcpt,ben_vcodecpt,ben_istatut
            from beneficiaire 
        where ben_vcodecpt = {$id}
    "));
    return $response;
    }
    function searchBeneficiaire($term,$userId)
    {  
        $response = DB::select(DB::raw("
            select *
                from beneficiaire 
            where ben_vcodecli = {$userId}
            and (ben_vcodecpt like '%{$term}%'
            or ben_vnom like '%{$term}%'
            or ben_vprenom like '%{$term}%'
            ) 
        "));
        return $response;
    }
    function addBeneficiaire($data)
    {
        $lastId = $this->getLastBenId();
        date_default_timezone_set('Africa/Nairobi');
        if ($data && $lastId) {
            try {
                DB::table('beneficiaire')
                    ->insert([
                        'ben_iindex' => $lastId + 1,
                        'ben_vnom' => $data['benNom'],
                        'ben_vprenom' => $data['benPrenom'],
                        'ben_vbanquecpt' => $data['benBanqueCode'],
                        'ben_vbranchecpt' => $data['benAgenceCode'],
                        'ben_vcodecpt' => $data['benCompteCode'],
                        'ben_vribcpt' => $data['benRib'],
                        'ben_vcodecli' => $data['benClientCode'],
                        // 'ben_istatut'=> 0,
                        'ben_dsys' => date('Y-m-d'),
                        'ben_tsys' => date('H:i:s'),
                    ]);
                return response(['message' => 'success']);
            } catch (QueryException $e) {
                return $e->getMessage();
            }
        }
    }
    function deleteBeneficiaire($id)
    {
        if ($id) {
            try {
                DB::delete("DELETE FROM beneficiaire where ben_iindex = ?", [$id]);
                return response()->json(null, 204);
            } catch (\Throwable $th) {
                return response('Error during deletion');
            }
        }
        return 'no id value in delete beneficiaire';
    }
    function getLastBenId()
    {
        $lastId = DB::table('beneficiaire')
            ->select('ben_iindex')
            ->orderBy('ben_iindex', 'desc')
            ->limit(1)
            ->first();
        return $lastId->ben_iindex;
    }

    function removeBeneficiaire()
    {

    }
}