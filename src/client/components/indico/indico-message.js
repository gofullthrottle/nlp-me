
import React from 'react';
import greetings from '../../greetings'


class IndicoMessage extends React.Component {

  constructor(props){
    super(props);
    this.greeting = greetings[(Math.random() * greetings.length).toFixed()];
  }

  toggleMessageView(){
    this.props.toggleMessageView(this.props.id);
  }

  renderHeader(){
    if (this.props.analyses.successes.length && !this.props.viewJson){
      return (
        <div>
          <strong>{this.greeting} Here are my analyses of your input</strong>
          <span className="json-link">
            &nbsp;- <a onClick={this.toggleMessageView.bind(this)}>view in JSON</a>
          </span>
        </div>
      )
    }
    if (this.props.analyses.successes.length && this.props.viewJson){
      return (
        <div>
          <strong>Analyses of your input in JSON</strong>
          <span className="json-link">
            &nbsp;- <a onClick={this.toggleMessageView.bind(this)}>view in English</a>
          </span>
        </div>
      )
    }
  }

  renderJson(analysis){
    return (
      <div key={analysis.type}>
        <h5>{analysis.type.charAt(0).toUpperCase() + analysis.type.slice(1)}</h5>
        <pre>{JSON.stringify(analysis.data, null, 2)}</pre>
      </div>
    )
  }

  zeroToOne(sentiment){
    return sentiment.toFixed(2);
  }

  renderTexttags(texttags){

    let showHideTt = (this.props.viewTexttags ? <span>&nbsp;&nbsp;- hide text tags</span> : <span> &nbsp;&nbsp;- show text tags</span>);

    let texttagsAnalysis;
    if (!this.props.viewTexttags){
      texttagsAnalysis = null;
    } else {
      texttagsAnalysis = (
        <ul>
          <li><strong>text tag: percent confidence</strong></li>
          {Object.keys(texttags).map(tt => {
            return (
              <li key={tt}>{tt}: {this.ttConfidence(texttags[tt])}%</li>
            )
          })}
        </ul>
      )
    }

    return (
      <div key='texttags'>
        <h5>Text Tags</h5>
        <span onClick={this.toggleTexttagsView.bind(this)}>{showHideTt}</span>
        <div>{texttagsAnalysis}</div>
      </div>
    )

  }

  ttConfidence(confidence){
    return (confidence * 100).toFixed(2);
  }

  toggleTexttagsView(){
    this.props.toggleTexttagsView(this.props.id);
  }

  renderSentiment(sentiment){
    return (
      <div key='sentiment'>
        <h5>Sentiment</h5>
        <p>On a scale of 0 to 1, 0 being negative and 1 being positive, I rate your input as a <strong>{this.zeroToOne(sentiment)}</strong></p>
      </div>
    )
  }

  renderPersonality(personality){
    return (
      <div key='personality'>
        <h5>Personality</h5>
        <p>
          On a scale of 0 to 1, I rate your <strong>openness</strong> as <strong>{this.zeroToOne(personality.openness)}</strong>, your <strong>extraversion</strong> as <strong>{this.zeroToOne(personality.extraversion)}</strong>, your <strong>agreeableness</strong> as <strong>{this.zeroToOne(personality.agreeableness)}</strong>, and your <strong>conscientiousness</strong> as <strong>{this.zeroToOne(personality.conscientiousness)}</strong>.
        </p>
      </div>
    )
  }

  renderPeople(people){

    let peopleAnalysis;
    let length = people.length;
    if (!length){
      peopleAnalysis = 'Woops, no people could be found in your input.'
    } else if ( length === 1 ){
      peopleAnalysis = [
        'The only person I could find in your input is',
        <strong key='only'> {people[0].text}</strong>
      ];
    } else {
      peopleAnalysis = ['The people I could find in your input are'];
      for (var i = 0; i < people.length; i++) {
        if (people.length > 1 && i === people.length - 1){
          peopleAnalysis.push(' and')
        }
        peopleAnalysis.push(
          <strong key={i}> {people[i].text}</strong>
        )
        if (people.length > 2 && i !== length - 1){
          peopleAnalysis.push(',');
        }
      }
      peopleAnalysis.push('.');
    }

    return (
      <div key='people'>
        <h5>People</h5>
        <p>{peopleAnalysis}</p>
      </div>
    )

  }

  renderPolitical(political){
    return (
      <div key='political'>
        <h5>Political</h5>
        <p>
          On a scale of 0 to 1, I rate your <strong>liberal</strong> tone as <strong>{this.zeroToOne(political.Liberal)}</strong>, your <strong>conservative</strong> tone as <strong>{this.zeroToOne(political.Conservative)}</strong>, your <strong>libertarian</strong> tone as <strong>{this.zeroToOne(political.Libertarian)}</strong>, and your <strong>green</strong> tone as <strong>{this.zeroToOne(political.Green)}</strong>.
        </p>
      </div>
    )
  }

  renderEmotion(emotion){
    return (
      <div key='emotion'>
        <h5>Emotion</h5>
        <p>
          On a scale of 0 to 1, I rate your tone of <strong>anger</strong> as <strong>{this.zeroToOne(emotion.anger)}</strong>, your tone of <strong>joy</strong> as <strong>{this.zeroToOne(emotion.joy)}</strong>, your tone of <strong>fear</strong> as <strong>{this.zeroToOne(emotion.fear)}</strong>, your tone of <strong>sadnress</strong> as <strong>{this.zeroToOne(emotion.sadness)}</strong>, and your tone of <strong>surprise</strong> as <strong>{this.zeroToOne(emotion.surprise)}</strong>.
        </p>
      </div>
    )
  }

  renderErrors(){
    let errors = this.props.analyses.errors;
    if (!errors.length){
      return null;
    } else {

      let errorList;

      if (errors.length === 1){

        errorList = [
          'There was an error receiving your ',
          <strong key='only'>{errors[0]}</strong>,
          ' analysis.'
        ];

      } else {

        errorList = ['There were errors retreiving your'];
        let i;
        for (i = 0; i < errors.length; i++) {
          if(i === errors.length -1){
            errorList.push(' and');
          }
          errorList.push(
            <strong key={i}> {errors[i]}</strong>
          )
          if (errors.length > 2 && i !== errors.length -1){
            errorList.push(',');
          }
        }
        errorList.push(' analyses.');

      }

      return (
        <div>
          <h5>Errors</h5>
          <p>{errorList}</p>
        </div>
      )

    }
  }

  render(){

    let successes = null;
    if(this.props.analyses.successes.length){
      if(!this.props.viewJson){
        successes = this.props.analyses.successes.map(success => {
          if (success.type === 'texttags'){
            return this.renderTexttags(success.data.results);
          } else if (success.type === 'sentiment'){
            return this.renderSentiment(success.data.results);
          } else if (success.type === 'personality'){
            return this.renderPersonality(success.data.results);
          } else if (success.type === 'people'){
            return this.renderPeople(success.data.results);
          } else if (success.type === 'political'){
            return this.renderPolitical(success.data.results);
          } else if (success.type === 'emotion'){
            return this.renderEmotion(success.data.results);
          }
        })
      } else {
        successes = this.props.analyses.successes.map(success => {
          return this.renderJson(success);
        })
      }
    }

    let errors = this.renderErrors();

    return (
      <div>

        <img className="avatar" src="images/indico-icon.png"/>

        <div className="message indico">

          <span className="outer-triangle"> </span>
          <span className="inner-triangle"> </span>

          <div className="message-header">
            {this.renderHeader()}
          </div>


          <div>
            {successes}
          </div>

          <div>
            {errors}
          </div>

        </div>

      </div>
    )

  }
}

export default IndicoMessage
