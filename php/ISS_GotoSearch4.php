<? 
/*
    *********************************************************    
    2002.10.9 
    박상진
    kiss@kstudy.com
    *********************************************************
    
    연세대학교 법학연구원 의료·과학기술과 법센터 코드 = "3439"
    회원 로그인 체크 등의 필요시 본페이지 상단에서 Session 체크해주면 되겠습니다.
    별도의 parameter없이 육 페이지에 링크를 걸어주기만 하면 저널서비스는 동작합니다.
    
    (1) 시작페이지 설정(적지 않으면 "ISS_SForm")
        $startPage = "ISS_SForm" '빠른검색
        $startPage = "ISS_DForm" '상세검색
        $startPage = "ISS_RForm" '권호검색
    
    (2) 아래 설정은 각 학회의 회원세션값에 맞춰서 설정(로그인 한 회원만 다운로드 가능하게 설정 시 필수) 
        $Session_Member = "" 
*/
    
    $clientKey = 3439;
    $startPage = "ISS_RForm";
    $Session_Member = "";
    

//세션값 설정부분 ==========================================================

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