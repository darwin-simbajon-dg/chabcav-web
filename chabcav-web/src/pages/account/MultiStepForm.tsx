import React, { useState, useEffect, useRef } from 'react';

// Mock Data for Lessons
const lessons = [
  {
    title: 'Lesson 1: Introduction',
    content: `
      <h2>Welcome to the Course</h2>
      <p>This lesson will give you an overview of the course and what you will learn.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.</p>
      <p>To complete this lesson, read all the content provided here. Once you reach the bottom, the "Next Lesson" button will be enabled.</p>
      <p>To complete this lesson, read all the content provided here. Once you reach the bottom, the "Next Lesson" button will be enabled.</p>
      <p>To complete this lesson, read all the content provided here. Once you reach the bottom, the "Next Lesson" button will be enabled.</p>
      <p>To complete this lesson, read all the content provided here. Once you reach the bottom, the "Next Lesson" button will be enabled.</p>
      ${"<p>".repeat(100)}This is additional content to make scrolling necessary.${"</p>".repeat(100)}
    `,
  },
  {
    title: 'Lesson 2: Basics',
    content: `
      <h2>Basics of Learning</h2>
      <p>Understanding the fundamentals is key to success. This lesson covers the essential basics to set you up for future lessons.</p>
      <p>Scroll to the bottom to proceed to the next lesson.</p>
            <p>Scroll to the bottom to proceed to the next lesson.</p>
                  <p>Scroll to the bottom to proceed to the next lesson.</p>
                        <p>Scroll to the bottom to proceed to the next lesson.</p>
                              <p>Scroll to the bottom to proceed to the next lesson.</p>
      ${"<p>".repeat(100)}This is additional content to make scrolling necessary.${"</p>".repeat(100)}
    `,
  },
  {
    title: 'Lesson 3: Advanced Topics',
    content: `
      <h2>Advanced Topics</h2>
      <p>Now that you understand the basics, let's dive deeper into the more complex concepts.</p>
      <p>Remember to read thoroughly and reach the bottom to unlock the next lesson.</p>
      ${"<p>".repeat(100)}This is additional content to make scrolling necessary.${"</p>".repeat(100)}
    `,
  },
];

const MultiStepForm: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isBottomReached, setIsBottomReached] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Handle scrolling detection
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      setIsBottomReached(scrollTop + clientHeight >= scrollHeight - 5);
    }
  };

  const resetScrollPosition = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Move to the next lesson
  const handleNextLesson = () => {
    setCurrentLesson((prev) => Math.min(prev + 1, lessons.length - 1));
    setIsBottomReached(false);
    resetScrollPosition();
  };

  // Move to the previous lesson
  const handlePreviousLesson = () => {
    setCurrentLesson((prev) => Math.max(prev - 1, 0));
    setIsBottomReached(true);
  };

  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="container-fluid py-2">
      <div className="row">
        <div className="col-12">
          <div className="multisteps-form mb-9">
            {/* Multistep Progress Bar */}
            <div className="row">
              <div className="col-12 col-lg-8 mx-auto my-5">
                <div className="multisteps-form__progress">
                  {lessons.map((lesson, index) => (
                    <button
                      key={index}
                      className={`multisteps-form__progress-btn ${
                        index === currentLesson ? 'js-active' : ''
                      } ${index < currentLesson ? 'completed' : ''}`}
                      onClick={() => setCurrentLesson(index)}
                      disabled={index > currentLesson} // Disable navigation to future lessons
                    >
                      {lesson.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Lesson Panel */}
            <div className="row">
              <div className="col-12 col-lg-12 m-auto lesson-pane">
                <div className="card">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3 lesson-title">
                      <h5 className="font-weight-bolder text-white mb-0">{lessons[currentLesson].title}</h5>
                    </div>
                  </div>
                  <div
                    className="card-body"
                    ref={contentRef}
                    style={{ height: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '15px' }}
                  >
                    <div
                      className="multisteps-form__content"
                      dangerouslySetInnerHTML={{ __html: lessons[currentLesson].content }}
                    />
                  </div>
                  <div className="button-row d-flex mt-4">
                    {currentLesson > 0 && (
                      <button
                        className="btn bg-gradient-light mb-0"
                        type="button"
                        onClick={handlePreviousLesson}
                      >
                        Previous Lesson
                      </button>
                    )}
                    {currentLesson < lessons.length - 1 && (
                      <button
                        className="btn bg-gradient-dark ms-auto mb-0"
                        type="button"
                        onClick={handleNextLesson}
                        disabled={!isBottomReached}
                      >
                        Next Lesson
                      </button>
                    )}
                    {currentLesson === lessons.length - 1 && (
                      <button className="btn bg-gradient-success ms-auto mb-0" type="button">
                        Finish Course
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
