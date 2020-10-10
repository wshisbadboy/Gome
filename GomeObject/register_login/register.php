<?php
  header("Content-type:text/html;charset=utf-8");

  //返回提示信息
  $response = array('code'=> 0,'msg'=>'');

  $username = $_POST['username'];
  $password = $_POST['password'];
  $repassword = $_POST['repassword'];

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
  if($repassword != $password){
    $response['code'] = 3;
    $response['msg'] = '密码不一致！';
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
  if($row){
    $response['code'] = 5;
    $response['msg'] = '用户名已存在';
    echo json_encode($response);
    exit;
  }

  $str = md5(md5($password).'zhuzhu');
  //注册
  $sql2 = "insert into register (username,password) values ('{$username}','{$str}')";
  // $sql2 = "INSERT INTO register (username,password) VALUES('{$username}','{$password}')";

  $res1 = mysql_query($sql2);
  if(!$res1){
    $response['code'] = 6;
    $response['msg'] = '注册失败！';
    echo json_encode($response);
    exit;
  }

  $response['msg'] = '注册成功';
  echo json_encode($response);
  

  // //8、关闭数据库
  mysql_close($link);
?>