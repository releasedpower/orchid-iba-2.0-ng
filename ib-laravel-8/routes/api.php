<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeneficiaireController;
use App\Http\Controllers\ChequierController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\OppositionController;
use App\Http\Controllers\VirementController;
use App\Http\Middleware\CheckLoginMiddleware;
use App\Http\Controllers\BanqueController;
use App\Models\TokenGenerator;
use App\Models\VirementModel;
use Illuminate\Support\Facades\Route;

Route::middleware([CheckLoginMiddleware::class])->group(function () {
    Route::get('/solde/{userId?}', [ClientController::class, 'getSolde']);
    Route::get('/userInfo/{userId?}', [ClientController::class, 'getInfo']);
    Route::get('/beneficiaires/{userId?}', [ClientController::class, 'getBeneficiaires']);
    Route::get('/depensesMois/{compteId}',[ClientController::class, 'getDepensesMois']);
    Route::get('/recettesMois/{compteId}',[ClientController::class, 'getRecettesMois']);

    // Utilisateur
    Route::get('/transactions/{compteId?}', [ClientController::class, 'getTransactions']);
    Route::get('/transactionsWithBalance/{compteId?}', [ClientController::class, 'getTransactionsWithBalance']);
    Route::get('/compteById/{compteId}', [ClientController::class, 'getCompteById']);
    // Beneficiaires
    Route::post('/addBeneficiaire', [BeneficiaireController::class, 'addBeneficiaire']);
    Route::delete('/deleteBeneficiaire/{id?}', [BeneficiaireController::class, 'deleteBeneficiaire']);
    Route::get('/searchBeneficiaire/{term?}/{userId?}', [BeneficiaireController::class, 'searchBeneficiaire']);
    Route::get('/beneficiaireById/{benIndex?}', [BeneficiaireController::class, 'getBeneficiaireById']);

    // Banques
    Route::get('/banques', [BanqueController::class, 'getBanques']);
    Route::get('/agences/{banqueId?}', [BanqueController::class, 'getAgencesByBanque']);

    // Virement
    Route::post('/addVirement', [VirementController::class, 'addVirement']);
    Route::post('/addVirementInterne', [VirementController::class, 'addVirementInterne']);
    Route::get('/virementsByCompte/{codeCpt?}', [VirementController::class, 'getVirementsByCompte']);

    // Demandes chequier
    Route::post('/addDemandeChequier', [ChequierController::class, 'addDemandeChequier']);
    Route::delete('/deleteDemandeChequier/{id?}', [ChequierController::class, 'deleteDemandeChequier']);
    Route::get('/demandesChequier/{id?}', [ChequierController::class, 'getDemandesChequier']);
    Route::get('/demandesChequierByCompte/{compteId?}', [ChequierController::class, 'getDemandesChequierByCompte']);
    Route::get('/typeCarnet', [ChequierController::class, 'getTypeCarnet']);
    Route::get('/typeChequier', [ChequierController::class, 'getTypeChequier']);

    // Opposition
    Route::get('/oppositionTypeCheque', [OppositionController::class, 'getOppositionTypeCheque']);
    Route::post('/addOpposition',[OppositionController::class, 'addOpposition']);
    Route::get('/oppositionsByCompte/{compteId?}', [OppositionController::class, 'getOppositionsByCompte']);

});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/loginWith2FA', [AuthController::class, 'loginWith2FA']);
Route::post('/userToken', [TokenGenerator::class, 'getTokenByIdClient']);
Route::get('/getit',[AuthController::class,'getMdp']);