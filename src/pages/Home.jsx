import React, { useState } from 'react'
import axios from 'axios';
import './index.scss'


const styles = {
  outerContainer: {
    height: "calc(100vh - 120px)",
    width: "calc(100% - 120px)",
    backgroundColor: "#ffffff",
    overflow: "scroll",
    maxWidth: 600
  },
  textColor: {
    color: "#848484"
  }
}
const Home = () => {
  let [studentData, SetStudentData] = useState('');
  let [searchData, SetSearchData] = useState([]);
  let [searchText, SetSearchText] = useState('');
  let [tagText, SetTagText] = useState('');
  let [tagTextState, SetTagTextState] = useState('');

  function Average(elmt) {
    var sum = 0;
    for (var i = 0; i < elmt.length; i++) {
      sum += parseInt(elmt[i], 10); //don't forget to add the base
    }

    return sum / elmt.length;
  }

  function FetchData() {
    axios.get("https://api.hatchways.io/assessment/students").then(res => {
      SetStudentData(res.data.students);
    })
  }
  const SearchByName = (students, e, tagText) => {
    let theValue = e.target.value;
    let allData = students;
    let getSearch = [];
    allData.map((student, id) => {
      let theTag = student.tag;
      let theName = student.firstName + " " + student.lastName;
      if (tagText !== "" && theTag!==undefined) {
        if(theValue!==""){
          if (theName.toLowerCase().includes(theValue.toLowerCase()) && theTag.toLowerCase().includes(tagText.toLowerCase())) {
            getSearch[id] = student;
          }
        }
        else{
          if (theTag.toLowerCase().includes(tagText.toLowerCase())) {
            getSearch[id] = student;
          }
        }
       
      }
      else {
        if (theName.toLowerCase().includes(theValue.toLowerCase())) {
          getSearch[id] = student;
        }
      }

    })
    SetSearchData(getSearch);
    SetSearchText(theValue);
  }

  const SearchByTag = (students, e, searchText) => {
    let theValue = e.target.value;
    let allData = students;
    let getSearch = [];
    allData.map((student, id) => {
      let theTag = student.tag;
      let theName = student.firstName + " " + student.lastName;
      if (theTag!==undefined) {
        if (searchText !== "") {
          if (theTag.toLowerCase().includes(theValue.toLowerCase()) && theName.toLowerCase().includes(searchText.toLowerCase())) {
            getSearch[id] = student;
          }
        }
        else {
          if (theTag.toLowerCase().includes(theValue.toLowerCase())) {
            getSearch[id] = student;
          }
        }
      }

    })
    SetSearchData(getSearch);
    SetTagText(theValue);
  }


  const keyPress = (e, id, students) => {
    if (e.keyCode == 13) {
      if (students[id]['tag'] == undefined) {
        students[id]['tag'] = e.target.value;
      }
      else {
        students[id]['tag'] = students[id]['tag'] + "#" + e.target.value;
      }
      SetStudentData(students);
      SetSearchData(students);
      SetTagTextState(e.target.value);
    }
  }

  const DataShow = ({ students }) => (

    students.map((student, id) => {
      let tagsArray = [];
      if (student['tag'] != undefined) {
        tagsArray = student['tag'].split('#');
      }

      return <div key={id} className="row mt-4 pb-2" style={{ borderBottom: "1px solid #f6f6f6" }}>
        <div className="w-25 position-relative">
          <img src={student.pic} style={{ height: 100, width: 100, border: "1px solid #f6f6f6", borderRadius: "50%" }} alt="" className="mx-auto position-relative" />
        </div>
        <div className="w-75 justify-content-between">
          <div className="row">
            <h2 className="text-uppercase">{student.firstName + " " + student.lastName}</h2><div className="panel-title ml-auto mr-2"><button className="ml-auto" data-toggle="collapse" data-target={`#demo${id}`}></button></div>

          </div>
          <div style={styles.textColor}>Email:{student.email}</div>
          <div style={styles.textColor}>Company:{student.company}</div>
          <div style={styles.textColor}>Skill:{student.skill}</div>
          <div style={styles.textColor}>Average:{Average(student.grades)}%</div>

          <div id={`demo${id}`} className=" collapse">
            <GetTests grades={student.grades} />
          </div>
          <div className="row mt-2">
            {tagsArray.length > 0 && <ShowTags tags={tagsArray} />}
          </div>

          <input type="text" className="w-100" onKeyDown={e => keyPress(e, id, students)} style={{ outline: "none", border: "0px", borderBottom: "1px solid #f6f6f6", height: "40px" }} placeholder="Add Tag" />

        </div>
      </div>;
    })

  )


  const ShowTags = ({ tags }) => (
    tags.map((test, id) => {
      return <div className="p-2 bg-dark text-white  mr-1 " key={id} style={styles.textColor}>
        {test}
      </div>
    })
  )
  const GetTests = ({ grades }) => (
    grades.map((test, id) => {
      return <div key={id} style={styles.textColor}>
        test {id}:  {test}
      </div>
    })
  )

  return (

    <div style={styles.outerContainer} className="mt-4 mx-auto p-2">
      <input type="text" className="w-100" onChange={e => SearchByName(studentData, e, tagText)} style={{ outline: "none", border: "0px", borderBottom: "1px solid #f6f6f6", height: "40px" }} placeholder="Search By Name" />
      <input type="text" className="w-100" onChange={e => SearchByTag(studentData, e, searchText)} style={{ outline: "none", border: "0px", borderBottom: "1px solid #f6f6f6", height: "40px" }} placeholder="Search By Tag" />

      {studentData.length === 0 && FetchData()
      }
      {searchText === "" && studentData.length > 0 &&
        <DataShow students={studentData} />
      }
      {searchText !== "" &&
        <DataShow students={searchData} />
      }
    </div>
  )
}

export default Home;

