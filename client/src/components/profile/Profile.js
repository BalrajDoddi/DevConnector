import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
          {profile === null ? (
            match.params.id !== auth.user._id ? (
              <p className='my-1'>User is have not setup a profile</p>
            ) : (
              <Fragment>
                <p className='my-1'>
                  You have not yet setup a profile, please add some info
                </p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                  Create Profile
                </Link>
              </Fragment>
            )
          ) : (
            <Fragment>
              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link to='/edit-profile' className='btn btn-dark'>
                    Edit Profile
                  </Link>
                )}
              <div className='profile-grid my-1'>
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />

                <div className='profile-exp bg-white p-2'>
                  <h2 className='text-primary'>Experiences</h2>
                  {profile.experience.length > 0 ? (
                    <Fragment>
                      {profile.experience.map((experience) => (
                        <ProfileExperience
                          key={experience._id}
                          experience={experience}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h2>No Experience Credentials</h2>
                  )}
                </div>

                <div className='profile-edu bg-white p-2'>
                  <h2 className='text-primary'>Education</h2>
                  {profile.education.length > 0 ? (
                    <Fragment>
                      {profile.education.map((education) => (
                        <ProfileEducation
                          key={education._id}
                          education={education}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h2>No Education Credentials</h2>
                  )}
                </div>

                {profile.githubusername && (
                  <ProfileGithub username={profile.githubusername} />
                )}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
