<?php
  header("Content-type:text/html;charset=utf-8");

  //返回提示信息
  $response = array('code'=> 0,'msg'=>'');

  // var_dump($_POST);

  $username = $_POST['username'];
  $password = $_POST['password'];

  //判断输入的情况
  if(!$username){
    $response['code'] = 1;
    $response['msg'] = '用户名不能为空！';
    echo json_encode($response);
    exit;
  }
  if(!$password){
    $response['code'] = 2;
    $response['msg'] = '密码不能为空！';
    echo json_encode($response);
    exit;
  }

  //1、连接数据库  
  $link = mysql_connect('localhost','root','root');
  //2、判断是否连接成功
  if(!$link){
    $response['code'] = 4;
    $response['msg'] = '服务器忙！';
    echo json_encode($response);
    exit;   //连接失败终止后续所有代码
  }
  
  //3、设置字符集
  mysql_set_charset('utf8');
  //4、选择数据库
  mysql_select_db('2004');
  // //5、准备SQL语句
  $sql = "select * from register where username='{$username}'";
  // echo $sql;
  // //6、发送SQL语句
  $res = mysql_query($sql);
  //7、取出一行数据
  $row = mysql_fetch_assoc($res);
  if(!$row){
    $response['code'] = 5;
    $response['msg'] = '用户名不存在，请注册！';
    echo json_encode($response);
    exit;
  }
  // echo json_encode($row);

  $str = md5(md5($password).'zhuzhu');
  if($str == $row['password']){
    $response['msg'] = '登录成功！';
    echo json_encode($response);
    exit;
  }else{
    $response['code'] = 6;
    $response['msg'] = '密码错误！';
    echo json_encode($response);
    exit;
  }
  
?>