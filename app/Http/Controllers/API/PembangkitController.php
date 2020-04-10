<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Pembangkit1;
use Illuminate\Support\Facades\DB;

class PembangkitController extends Controller
{
    public function powerChart()
    {
        $filter = request()->year . '-' . request()->month;
        $parse = Carbon::parse($filter);
        $array_date = range($parse->startOfMonth()->format('d'), $parse->endOfMonth()->format('d'));

        $pembangkit1 = Pembangkit1::select(DB::raw('date(from_unixtime(`time@timestamp`)) as date,
        sum(data_format_0) as mw, sum(data_format_1) as mvar, sum(data_format_2) as kv, sum(data_format_2) as ka'))
            ->where(DB::raw('date(from_unixtime(`time@timestamp`))'), 'LIKE', '%' . $filter . '%')
            ->groupBy(DB::raw('date(from_unixtime(`time@timestamp`))'))
            ->get();

        $data = [];
        $i = 0;
        foreach ($array_date as $row) {
            $f_date = strlen($row) == 1 ? 0 . $row : $row;
            $date = $filter . '-' . $f_date;
            $total = $pembangkit1->firstWhere('date', $date);

            $data[]['date'] = $date;
            $data[]['data'] = [
                'mw' => $total ?  $total->mw : 0,
                'mvar' => $total ?  $total->mvar : 0,
                'kv' => $total ? $total->kv : 0,
                'ka' => $total ? $total->ka : 0
            ];
        }
        // dd($data);
        return $data;
    }
}
