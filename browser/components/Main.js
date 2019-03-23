import React, { Component } from 'react';
import axios from 'axios';
import NewStudentForm from "./NewStudentForm";
import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      formHidden: false
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.toggleHide = this.toggleHide.bind(this)
    this.addStudent = this.addStudent.bind(this)

  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }
  toggleHide(){
    this.setState({formHidden: !this.state.formHidden})
  }

  async addStudent(student){
    try {
      console.log('Student-->', student)
      const { data } = await axios.post('/student', student)
      await this.setState({students: [...this.state.students, data]})
      console.log( 'data-->', data)


    } catch (error) {
      console.error(error)
    }
  }


  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  render() {
    console.log('MAIN MAIN MAIN', this.state)
    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
        <button onClick={this.toggleHide}>Add New Student</button>
        {this.state.formHidden ? <NewStudentForm  addStudent={this.addStudent}/> : null}
      </div>
    );
  }
}
