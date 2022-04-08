<?php
// +----------------------------------------------------------------------
// | likeshop100%开源免费商用商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshopTeam
// +----------------------------------------------------------------------


namespace app\common\lists;


use app\common\cache\ExportCache;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

trait ListsExcelTrait
{

    public int $pageStart = 1; //导出开始页码
    public int $pageEnd = 200; //导出介绍页码
    public string $fileName = ''; //文件名称


    /**
     * @notes 创建excel
     * @param $excelFields
     * @param $lists
     * @return string
     * @throws \PhpOffice\PhpSpreadsheet\Exception
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     * @author 令狐冲
     * @date 2021/7/21 16:04
     */
    public function createExcel($excelFields, $lists)
    {

        $title = array_values($excelFields);

        $data = [];
        foreach ($lists as $row) {
            $temp = [];
            foreach ($excelFields as $key => $excelField) {
                $temp[$key] = $row[$key];
            }
            $data[] = $temp;
        }


        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();


        //设置单元格内容
        foreach ($title as $key => $value) {
            // 单元格内容写入
            $sheet->setCellValueByColumnAndRow($key + 1, 1, $value);
        }
        $row = 2; //从第二行开始
        foreach ($data as $item) {
            $column = 1;
            foreach ($item as $value) {
                //单元格内容写入
                $sheet->setCellValueByColumnAndRow($column, $row, $value);
                $column++;
            }
            $row++;
        }


        $getHighestRowAndColumn = $sheet->getHighestRowAndColumn();
        $HighestRow = $getHighestRowAndColumn['row'];
        $column = $getHighestRowAndColumn['column'];
        $titleScope = 'A1:' . $column . '1';//第一（标题）范围（例：A1:D1)

        $sheet->getStyle($titleScope)
            ->getFill()
            ->setFillType(Fill::FILL_SOLID) // 设置填充样式
            ->getStartColor()
            ->setARGB('00B0F0');
        // 设置文字颜色为白色
        $sheet->getStyle($titleScope)->getFont()->getColor()
            ->setARGB('FFFFFF');

//        $sheet->getStyle('B2')->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_DATE_YYYYMMDD);
        $spreadsheet->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);


        $allCope = 'A1:' . $column . $HighestRow;//整个表格范围（例：A1:D5）
        $sheet->getStyle($allCope)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);

        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');

        //创建excel文件
        $exportCache = new ExportCache();
        $src = $exportCache->getSrc();
        if (!file_exists($src)) {
            mkdir($src, 0775, true);
        }
        $writer->save($src . $this->fileName);
        //设置本地excel缓存并返回下载地址
        return (string)(url('index/download/export', ['file' => $exportCache->setFile($this->fileName)], true, true));
    }


    /**
     * @notes 获取导出信息
     * @return array
     * @author 令狐冲
     * @date 2021/7/29 16:08
     */
    public function excelInfo()
    {
        $count = $this->count();
        $sum_page = max(ceil($count / $this->pageSize), 1);
        return [
            'count' => $count, //所有数据记录数
            'page_size' => $this->pageSize,//每页记录数
            'sum_page' => $sum_page,//一共多少页
            'max_page' => floor($this->pageSizeMax / $this->pageSize),//最多导出多少页
            'all_max_size' => $this->pageSizeMax,//最多导出记录数
            'page_start' => $this->pageStart,//导出范围页码开始值
            'page_end' => min($sum_page, $this->pageEnd),//导出范围页码结束值
            'file_name' => $this->fileName,//默认文件名
        ];
    }
}