<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class VirementModel extends Model
{
	use HasFactory;

	function addVirement($data){
		date_default_timezone_set('Africa/Nairobi');
		if ($data) {
			try {
				$index = $this->_calcnum('global_vir');
				$vir_vref = "IBV".str_pad( $index, 5, '0', STR_PAD_LEFT );

				DB::connection('compensation')
					->table('global_vir')
					->insert([
						'vir_vref' => $vir_vref,
						'vir_vcode' => $data['vir_vcode'],
						'vir_vbanque' => $data['vir_vbanque'],
						'vir_vbranche' => $data['vir_vbranche'],
						'vir_vrib' => $data['vir_vrib'],
						'vir_ddate' => $data['vir_ddate'],
						'vir_fmontant' => $data['vir_fmontant'],
						'vir_vperio' => '',
						'vir_vcodeute' => $data['vir_vcodeute'], // Code agence/branche
						'vir_vtype' => 'VIR_IBV', //Type du virement
						'vir_iday' => '0',
						'vir_ddeb' => $data['vir_ddate'],
						'vir_dfin' => $data['vir_ddate'],
						'vir_dsys' => date('Y-m-d'),
						'vir_tsys' => date('H:i:s'),
						'vir_vcodeut' => "IB",
						'vir_ipm' => '0',
						'vir_vpm_pin' => '',
						'vir_ipm_valid' => '0',
						'vir_vmotif' => $data['vir_vmotif'],
						'vir_ifrais' => '0'
					]);

				// Insertion detail du virement
					$vir_iindex = $this->_calcnum('virement' );
					// Raha entre banque samy hafa
					$vir_iinter = ( $data['vir_vbanque'] != $data['vir_vbanque_benef'])?1:0;
				DB::connection('compensation')
					->table('virement')
					->insert([
						'vir_iindex' => $vir_iindex,
						'vir_vref' => $vir_vref,
						'vir_ddate' => $data['vir_ddate'],
						'vir_vcode' => $data['vir_vcode'],
						'vir_vbanque' => $data['vir_vbanque'],
						'vir_vbranche' => $data['vir_vbranche'],
						'vir_vrib' => $data['vir_vrib'],
						'vir_vnom' => $data['vir_vnom'],
						'vir_vprenom' => $data['vir_vprenom'],
						'vir_vcode_benef' => $data['vir_vcode_benef'],
						'vir_vbanque_benef' => $data['vir_vbanque_benef'],
						'vir_vbranche_benef' => $data['vir_vbranche_benef'],
						'vir_vrib_benef' => $data['vir_vrib_benef'],
						'vir_vnom_benef' => $data['vir_vnom_benef'],
						'vir_vprenom_benef' => $data['vir_vprenom_benef'],
						'vir_fmontant' => $data['vir_fmontant'],
						'vir_vobserv' => '',
						'vir_vmotif' => $data['vir_vmotif'],
						'vir_dsys' => date('Y-m-d'),
						'vir_tsys' => date('H:i:s'),
						'vir_vcodeut' => 'IB',
						// 0 MANDRAPA
						'vir_ivalid' => '0',
						'vir_ienv' => '0',
						'vir_icompens' => '0',
						'vir_vfile_bfi' => '',
						'vir_iano' => '0',
						'vir_iinter' => $vir_iinter,
						'vir_iannule'=>'0',
						'vir_vannule_motif'=>''
					]);

				return response(['message' => 'success']);
			} catch (QueryException $e) {
				return $e->getMessage();
			}
		}
	}
	function getVirementsByCompte($codeCpt){
        $response = DB::connection('compensation')
		->select(DB::raw("
        select 
			vir_vcode,
			vir_vbanque,
			vir_vbranche,
			vir_vrib,
			vir_vnom_benef,
			vir_vprenom_benef,
			vir_fmontant,
			vir_vmotif,
			vir_ivalid,
			vir_ddate
        from 
			virement 
        where vir_vcode = {$codeCpt}
		order by vir_ivalid desc
    "));
    return $response;
    }
	// Laravel version of function _calcnum
	function _calcnum($table ) {
		$result = DB::connection('compensation')
			->table('lencode')
			->where('cod_vtable', $table)
			->first();
		$num= ($result->cod_inum)+1;
		DB::connection('compensation')
			->update('update lencode set cod_inum = LAST_INSERT_ID(cod_inum+1) where cod_vtable = ?', [$table]);

		$res2 = DB::connection('compensation')
			->table('lencode')
			->where('cod_vtable', $table)
			->first();
		return intval($res2->cod_inum);
	}
}