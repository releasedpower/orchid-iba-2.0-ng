<?php

namespace App\Http\Controllers;

use App\Models\BanqueModel;
use Illuminate\Http\Request;

class BanqueController extends Controller
{
	public function __invoke(Request $request){}

    function getBanques(){
        $banqueModel = new BanqueModel();
        return response($banqueModel->getBanques());
    }
    function getAgencesByBanque($banqueId = null){
        $banqueModel = new BanqueModel();
        return($banqueModel->getAgencesByBanque($banqueId));
    }
}
