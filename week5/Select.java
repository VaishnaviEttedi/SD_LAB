//package w5;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Scanner;
public class Select {
	private static final String SELECT_Query="SELECT id,student_name,age,address FROM  student_table";

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Scanner scn=new Scanner(System.in);
		//load the jdbc driver
		try {
		Class.forName("com.mysql.cj.jdbc.Driver");
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		//create the connection
		try(Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3308/student_table","root","1234")){
		PreparedStatement ps=con.prepareStatement(SELECT_Query);{
			//create the result set object
			ResultSet rs=ps.executeQuery();
			//fetch the data by row
			while(rs.next()) {
				System.out.println(rs.getInt(1)+" "+rs.getString(2)+"  "+rs.getInt(3)+" "+ rs.getString(4));
			}
			

		}
		}catch(SQLException se) {
			System.out.println(se.getMessage());
			se.printStackTrace();
		}catch(Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
			
			
	
			
		}

	}

}