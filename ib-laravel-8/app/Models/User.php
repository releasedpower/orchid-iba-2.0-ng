<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table='client_internet_banking';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    
    protected $primaryKey='iba_iindex';
    
    protected $fillable = [
        'iba_vlogin',
        'iba_vmdp',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'iba_vmdp',
        'iba_token',
    ];
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'iba_dvalid' => 'datetime',
    ];
}
