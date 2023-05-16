<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class BanqueModel extends Model
{
    use HasFactory;

    function getBanques()
    {
        $queryResult = DB::connection('sipem_iba')
            ->table('banque')
            ->select()
            ->get();
        for ($i = 0; $i < count($queryResult); $i++) {
            $response[$i] = [
                'banqueCode' => $queryResult[$i]->ins_vbanque,
                'banqueNom' => $queryResult[$i]->ins_vnom,
            ];
        }
        return $response;
    }
    function getAgencesByBanque($banqueId)
    {
        if ($banqueId) {
            try {
                $queryResult = DB::connection('sipem_iba')
                    ->table('branche')
                    ->where('ute_vbanque', $banqueId)
                    ->get();
                for ($i = 0; $i < count($queryResult); $i++) {
                    $response[$i] = [
                        'agenceCode' => $queryResult[$i]->ute_vcode,
                        'agenceNom' => $queryResult[$i]->ute_vnom,
                        'banqueCode' => $queryResult[$i]->ute_vbanque,
                    ];
                }
                return $response;
            } catch (QueryException $e) {
                return $e->getMessage();
            }
        } else
            return 'Tsy tafiditra';
    }
}