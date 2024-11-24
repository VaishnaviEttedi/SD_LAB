//package w5;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Scanner;
public class Insert {
	private static final String Insert_Query="INSERT INTO student_table(id,student_name,age,address) VALUES(?,?,?,?)";

	public static void main(String[] args) {
		Scanner scn =new Scanner(System.in);
		//load the jdbc driver
		try {
		Class.forName("com.mysql.cj.jdbc.Driver");
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		//create the connection
		try(Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3308/student_table","root","1234")){
		PreparedStatement ps=con.prepareStatement(Insert_Query);{
			System.out.println("enter studentid:");
			int studentid=scn.nextInt();
			System.out.println("Enter sname");
			String sname=scn.next();
			System.out.println("Enter sage");
		    int  sage=scn.nextInt();
			System.out.println("Enter sadress");
			String sadress=scn.next();
			
			
			//set the values
			ps.setInt(1, studentid);
			ps.setString(2, sname);
			ps.setInt(3, sage);
			ps.setString(4, sadress);
			//execute query
			int count=ps.executeUpdate();
			if(count==0) {
				System.out.println("Record is not registered");
			}else {
				System.out.println("record is registered");
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
