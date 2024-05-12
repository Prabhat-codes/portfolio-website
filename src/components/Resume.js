import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import WorkIcon from "@material-ui/icons/Work";
import StarIcon from "@material-ui/icons/Star";
import AdbIconOutlined from "@material-ui/icons/AdbOutlined";
import BeenhereIcon from "@material-ui/icons/Beenhere";

export default class Resume extends Component {
  render() {
    let resumeData = this.props.resumeData;
    const workData = this.props.resumeData["work"];
    const experienceOrder = { Experienced: 1, Intermediate: 2, Beginner: 3 };
    let nonTechnicalSkills = this.props.resumeData["nonTechnicalSkills"];
    let technicalSkills = this.props.resumeData["technicalSkills"];
    technicalSkills.sort(
      (a, b) => experienceOrder[a.level] - experienceOrder[b.level]
    );
    nonTechnicalSkills.sort(
      (a, b) => experienceOrder[a.level] - experienceOrder[b.level]
    );
    const renderSkillArticles = (skills) =>
      skills.map((skill, index) => (
        <article key={index} className="experience_details">
          {skill.icon}
          <h4>{skill.name}</h4>
          {/* <p className={`text-light ${skill.level.toLowerCase()}`}>
            {skill.level}
          </p> */}
        </article>
      ));
    return (
      <section id="resume">
        <div className="row work">
          <div className="header">
            <h1 className="header-text">
              <span>Work</span>
            </h1>
          </div>
          <VerticalTimeline lineColor="black">
            {workData.map((resume, index) => (
              <VerticalTimelineElement
                key={resume.srNo}
                className="vertical-timeline-element--work"
                date={resume.Date}
                dateClassName="timeline-date"
                contentStyle={{
                  border: "1px solid #000", // Adding black border
                  ...(resume.srNo === 1 && {
                    background: "rgb(33, 150, 243)",
                    color: "#fff",
                  }),
                }}
                contentArrowStyle={{
                  borderRight: "1px solid #000", // Adding black border
                  ...(resume.srNo === 1 && {
                    borderRight: "7px solid rgb(33, 150, 243)",
                  }),
                }}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                icon={<WorkIcon />}
              >
                <div>
                  {resume.Keywords.map((keyword, j) => (
                    <span
                      key={j}
                      className="badge"
                      style={{
                        backgroundColor:
                          resume.srNo !== 1 ? "#007bff" : "#ffffff", // Blue or white background based on srNo
                        color: resume.srNo !== 1 ? "#ffffff" : "#000000", // White or black text color based on srNo
                      }}
                    >
                      {keyword}
                    </span> // eslint-disable-line react/no-array-index-key
                  ))}
                </div>

                <h3 className="vertical-timeline-element-title">
                  {resume.Position}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {resume.Company}
                </h4>
                <p>{resume.Responsibilities}</p>
              </VerticalTimelineElement>
            ))}

            <VerticalTimelineElement
              iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
              icon={<StarIcon />}
            />
          </VerticalTimeline>
        </div>
        <div className="row education">
          <div className="three columns header-col">
            <h1>
              <span>Education</span>
            </h1>
          </div>

          <div className="nine columns main-col">
            {resumeData.education &&
              resumeData.education.map((item) => {
                return (
                  <div className="row item" key={item.UniversityName}>
                    <div className="twelve columns">
                      <h3>{item.UniversityName}</h3>
                      <p className="info">
                        {item.specialization}
                        <span>&bull;</span>{" "}
                        <em className="date">
                          {item.MonthOfPassing} {item.YearOfPassing}
                        </em>
                      </p>
                      <ul>
                        {item.Achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="row skill">
          <div className="three columns header-col">
            <h1>
              <span>Skills</span>
            </h1>
          </div>

          {/* <p>{resumeData.skillsDescription}</p> */}
          <section id="experience">
            <div className="container experience__container">
              <div className="experience__card">
                <h3>Technical</h3>
                <div className="experience_content">
                  {renderSkillArticles(
                    technicalSkills.map((skill) => ({
                      name: skill.name,
                      level: skill.level,
                      icon: <AdbIconOutlined className="experience__icons" />,
                    }))
                  )}
                </div>
              </div>
              <div className="experience__card">
                <h3>Non-Technical</h3>
                <div className="experience_content">
                  {renderSkillArticles(
                    nonTechnicalSkills.map((skill) => ({
                      name: skill.name,
                      level: skill.level,
                      icon: <BeenhereIcon className="experience__icons" />,
                    }))
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* <div className="bars">
              <ul className="skills">
                {resumeData.skills &&
                  resumeData.skills.map((item) => {
                    return (
                      <li key={item.skillname}>
                        <span
                          className={`bar-expand ${item.skillname.toLowerCase()}`}
                        />
                        <em>{item.skillname}</em>
                      </li>
                    );
                  })}
              </ul>
            </div> */}
        </div>
      </section>
    );
  }
}
