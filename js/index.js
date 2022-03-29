


export function getData() {
  return fetch(`https://golf-courses-api.herokuapp.com/courses/${courseId}`)
  .then(response => response.json())
  .then(data => courseData = data.data)
  .then(() => {
    renderScorecard(courseData);
  })
}