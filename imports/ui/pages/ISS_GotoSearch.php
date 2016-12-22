<?
/*
    *********************************************************
    2002.10.9
    �ڻ���
    kiss@kstudy.com
    *********************************************************

    �������б� ���п����� �ڵ� = "3032"
    ȸ�� �α��� üũ ���� �ʿ��� �������� ���ܿ��� Session üũ���ָ� �ǰڽ��ϴ�.
    ������ parameter���� �� �������� ��ũ�� �ɾ��ֱ⸸ �ϸ� ���μ��񽺴� �����մϴ�.

    (1) ���������� ����(���� ������ "ISS_SForm")
        $startPage = "ISS_SForm" '�����˻�
        $startPage = "ISS_DForm" '�󼼰˻�
        $startPage = "ISS_RForm" '��ȣ�˻�

    (2) �Ʒ� ������ �� ��ȸ�� ȸ�����ǰ��� ���缭 ����(�α��� �� ȸ���� �ٿ��ε� �����ϰ� ���� �� �ʼ�)
        $Session_Member = ""
*/

    $clientKey = 3032;
    $startPage = "ISS_RForm";
    $Session_Member = "";


//���ǰ� �����κ� ==========================================================

	IF  ($zb_logged_no != "") {
		$Session_Member = $zb_logged_no;
	} else {
		$Session_Member = "";
	}

//=========================================================================


    echo "<meta http-equiv='Refresh' content='0; URL=http://210.101.116.36/journalSearch/ISS_CreateSession.asp?encCode=" . encCode() . "&clientKey=" . $clientKey . "&startPage=" . $startPage . "&Session_Member=" . $Session_Member . "'>";

    Function encCode(){
        $timeStamp = date(y).date(m).date(d).date(H).date(i);
        $strTemp = '';

        for ($intTemp = 1; $intTemp <= 10; $intTemp++){
            $strTemp = substr($timeStamp, $intTemp - 1, 1).$strTemp;

            if ($intTemp == 1){
                $strTemp = (string)(203 + (date(s)*date(n))) . $strTemp;
            }
            if ($intTemp == 3){
                $strTemp = (string)(189 + (date(j)*date(H))) . $strTemp;
            }
            if ($intTemp == 9){
                $strTemp = (string)(187 + date(s)) . $strTemp;
            }
        }
        return $strTemp;
    }
?>
